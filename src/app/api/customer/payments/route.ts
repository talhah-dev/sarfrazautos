import { NextResponse } from "next/server"

const initialPayments = [
  {
    id: "pay-1",
    txnId: "PAY-981240",
    date: "24 Sep 2026",
    method: "Bank Transfer (IBFT)",
    bankName: "Bank Alfalah (Raast)",
    invoiceNumber: "INV-2026-0891",
    amount: 500000,
    status: "Cleared",
  },
  {
    id: "pay-2",
    txnId: "PAY-976520",
    date: "22 Sep 2026",
    method: "Direct Deposit Slip",
    bankName: "Meezan Bank Ltd",
    invoiceNumber: "INV-2026-0844",
    amount: 445000,
    status: "Cleared",
  },
  {
    id: "pay-3",
    txnId: "PAY-971033",
    date: "18 Sep 2026",
    method: "Habib Bank Cheque (#4401)",
    bankName: "HBL Commercial",
    invoiceNumber: "INV-2026-0720",
    amount: 385000,
    status: "Cleared",
  },
  {
    id: "pay-4",
    txnId: "PAY-964119",
    date: "14 Sep 2026",
    method: "Bank Transfer (Raast)",
    bankName: "Faysal Bank Islamic",
    invoiceNumber: "INV-2026-0688",
    amount: 760000,
    status: "Cleared",
  },
  {
    id: "pay-5",
    txnId: "PAY-958012",
    date: "10 Sep 2026",
    method: "Cash Bilty Deposit",
    bankName: "United Bank Limited",
    invoiceNumber: "INV-2026-0798",
    amount: 300000,
    status: "In Processing",
  },
  {
    id: "pay-6",
    txnId: "PAY-949102",
    date: "04 Sep 2026",
    method: "Online Transfer (1Link)",
    bankName: "MCB Bank Ltd",
    invoiceNumber: "INV-2026-0540",
    amount: 150000,
    status: "Failed",
  },
]

export async function GET() {
  try {
    const totalPaid = initialPayments
      .filter((p) => p.status === "Cleared")
      .reduce((sum, p) => sum + p.amount, 0)
    const inProcessing = initialPayments
      .filter((p) => p.status === "In Processing")
      .reduce((sum, p) => sum + p.amount, 0)

    return NextResponse.json({
      success: true,
      payments: initialPayments,
      stats: {
        totalCleared: `Rs. ${totalPaid.toLocaleString()}`,
        inProcessing: `Rs. ${inProcessing.toLocaleString()}`,
        totalTransactions: initialPayments.length,
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch payments" },
      { status: 500 }
    )
  }
}
