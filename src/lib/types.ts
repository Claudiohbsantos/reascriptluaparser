export interface Variable {
  type?: string
  name?: string
  optional?: boolean
}

export interface Method {
  name: string
  params?: Variable[]
  returns?: Variable[]
  description?: string
  namespace?: string
}
