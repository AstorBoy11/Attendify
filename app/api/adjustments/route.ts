import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Adjustment from '@/models/Adjustment';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

// Helper: Extract userId from JWT token cookie
async function getAuthenticatedUserId(): Promise<string | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get('attendify_token')?.value;
    if (!token) return null;

    const payload = await verifyToken(token);
    if (!payload || !payload.userId) return null;

    return payload.userId as string;
}

// GET /api/adjustments?year=2026&month=3
// Returns adjustments whose date range intersects with the requested month
export async function GET(req: Request) {
    try {
        await connectToDatabase();

        const userId = await getAuthenticatedUserId();
        if (!userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const now = new Date();
        const year = parseInt(searchParams.get('year') || String(now.getFullYear()));
        const month = parseInt(searchParams.get('month') || String(now.getMonth() + 1));

        // Month boundaries as YYYY-MM-DD strings
        const monthStr = String(month).padStart(2, '0');
        const daysInMonth = new Date(year, month, 0).getDate();
        const monthStart = `${year}-${monthStr}-01`;
        const monthEnd = `${year}-${monthStr}-${String(daysInMonth).padStart(2, '0')}`;

        // Find adjustments that overlap with this month
        // Overlap condition: adjustment.startDate <= monthEnd AND adjustment.endDate >= monthStart
        const adjustments = await Adjustment.find({
            startDate: { $lte: monthEnd },
            endDate: { $gte: monthStart },
        }).sort({ startDate: 1 });

        return NextResponse.json({ adjustments });
    } catch (error: any) {
        console.error('[Adjustments API] GET error:', error);
        return NextResponse.json({
            message: 'Internal server error',
            details: error.message
        }, { status: 500 });
    }
}

// POST /api/adjustments
export async function POST(req: Request) {
    try {
        await connectToDatabase();

        const userId = await getAuthenticatedUserId();
        if (!userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { name, startDate, endDate, reductionMinutes } = body;

        if (!name || !startDate || !endDate || reductionMinutes === undefined) {
            return NextResponse.json({
                message: 'Missing required fields: name, startDate, endDate, reductionMinutes'
            }, { status: 400 });
        }

        if (startDate > endDate) {
            return NextResponse.json({
                message: 'startDate must be before or equal to endDate'
            }, { status: 400 });
        }

        if (reductionMinutes < 0) {
            return NextResponse.json({
                message: 'reductionMinutes must be a positive number'
            }, { status: 400 });
        }

        // Check for overlapping adjustments
        const overlapping = await Adjustment.findOne({
            startDate: { $lte: endDate },
            endDate: { $gte: startDate },
        });

        if (overlapping) {
            return NextResponse.json({
                message: `Overlaps with existing adjustment "${overlapping.name}" (${overlapping.startDate} - ${overlapping.endDate})`
            }, { status: 409 });
        }

        const adjustment = await Adjustment.create({
            name: name.trim(),
            startDate,
            endDate,
            reductionMinutes: Number(reductionMinutes),
        });

        return NextResponse.json({ message: 'Adjustment created successfully', adjustment }, { status: 201 });
    } catch (error: any) {
        console.error('[Adjustments API] POST error:', error);
        return NextResponse.json({
            message: 'Internal server error',
            details: error.message
        }, { status: 500 });
    }
}

// DELETE /api/adjustments?id=xxx
export async function DELETE(req: Request) {
    try {
        await connectToDatabase();

        const userId = await getAuthenticatedUserId();
        if (!userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ message: 'Missing adjustment id' }, { status: 400 });
        }

        const adjustment = await Adjustment.findById(id);
        if (!adjustment) {
            return NextResponse.json({ message: 'Adjustment not found' }, { status: 404 });
        }

        await Adjustment.findByIdAndDelete(id);

        return NextResponse.json({ message: 'Adjustment deleted successfully' });
    } catch (error: any) {
        console.error('[Adjustments API] DELETE error:', error);
        return NextResponse.json({
            message: 'Internal server error',
            details: error.message
        }, { status: 500 });
    }
}
