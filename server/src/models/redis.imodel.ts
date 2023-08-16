export interface iRedisUserItem {
  str_id: string;
  public: number;
  availabilty: number;
}

export interface iRedisSecurityItem {
  str_id: string;
  public: number;
  availabilty: number;
}

export interface iRedisRelationItem {
  str_id: string;
  hBump: number;
  relationSet: string;
}

export interface iRedisRequestItem {
  str_id: string;
  reqInSet: string;
  reqOutSet: string;
}
