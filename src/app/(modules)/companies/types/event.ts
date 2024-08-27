export interface Event {
  reportUrl: string
  pdfUrl: string | null
  eventId: number
  eventTitle: string
  eventDate: string
  qnaTimestamp: string | null
  fiscalPeriod: string
  fiscalYear: string
}
