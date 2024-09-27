export class LoginResponse {
  code: number
  message: string
  token: string
}

export class LoginRequest {
  username: string
  password: string
  rememberMe: boolean
}

export class LoginErrorResponse {
  type: string
  title: string
  status: number
  detail: string
  instance: string
  message: string
  path: string
}
