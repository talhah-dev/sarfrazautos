import { NextResponse } from "next/server"

const initialInvoices = [
  {
    id: "inv-1",
    invoiceNumber: "INV-2026-0891",
    orderNumber: "BO-9482",
    issueDate: "24 Sep 2026",
    dueDate: "08 Oct 2026",
    itemsSummary: "24x CD70 Complete Cylinder Head",
    amount: 620000,
    status: "Paid",
  },
  {
    id: "inv-2",
    invoiceNumber: "INV-2026-0844",
    orderNumber: "BO-9420",
    issueDate: "22 Sep 2026",
    dueDate: "06 Oct 2026",
    itemsSummary: "40x Crown Heavy Duty Clutch Plates",
    amount: 445000,
    status: "Paid",
  },
  {
    id: "inv-3",
    invoiceNumber: "INV-2026-0798",
    orderNumber: "BO-9391",
    issueDate: "21 Sep 2026",
    dueDate: "05 Oct 2026",
    itemsSummary: "60x 125cc Piston Kits",
    amount: 890000,
    status: "Pending",
  },
  {
    id: "inv-4",
    invoiceNumber: "INV-2026-0720",
    orderNumber: "BO-9350",
    issueDate: "18 Sep 2026",
    dueDate: "02 Oct 2026",
    itemsSummary: "18x Heavy Duty Alloy Rim Hubs",
    amount: 385000,
    status: "Paid",
  },
  {
    id: "inv-5",
    invoiceNumber: "INV-2026-0688",
    orderNumber: "BO-9288",
    issueDate: "14 Sep 2026",
    dueDate: "28 Sep 2026",
    itemsSummary: "50x 70cc Standard Carburetors",
    amount: 760000,
    status: "Paid",
  },
  {
    id: "inv-6",
    invoiceNumber: "INV-2026-0610",
    orderNumber: "BO-9210",
    issueDate: "09 Sep 2026",
    dueDate: "23 Sep 2026",
    itemsSummary: "30x Full Gasket Overhaul Kits",
    amount: 290000,
    status: "Overdue",
  },
]

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      invoices: initialInvoices,
      totalCount: initialInvoices.length,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch invoices" },
      { status: 500 }
    )
  }
}
