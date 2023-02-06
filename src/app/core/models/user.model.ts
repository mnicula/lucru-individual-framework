export interface UserModel {
  authorities: [
    { authority: string; }
  ];
  username: string;
  type: string;
  token?: string;
}

