interface SignInResponse {
  id: string;
  name: string;
  lastName: string;
  nickName: string;
  token: string;
}

interface SigInRequest{
  userName:string;
  password:string;
}
