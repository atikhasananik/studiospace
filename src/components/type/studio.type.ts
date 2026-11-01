export interface IStudio {
  _id: string
  title: string
  category: string
  hourlyRate: number
  securityDeposit: number
  maxCapacity: number
  location: string
  imageUrl: string
  amenities: string[]
  detailedOverview: string
  rating: number
  ownerEmail?: string
}