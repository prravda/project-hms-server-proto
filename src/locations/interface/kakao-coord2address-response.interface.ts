export class KakaoRoadAddress {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  road_name: string;
  underground_yn: string;
  main_building_no: string;
  sub_building_no: string;
  building_name: string;
  zone_no: string;
}

export class KakaoAddress {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  mountain_yn: string;
  main_address_no: string;
  sub_address_no: string;
}

export class KakaoAddressDocument {
  road_address: KakaoRoadAddress;
  address: KakaoAddress;
}

export class KakaoMeta {
  total_count: number;
}
export class KakaoCoord2addressResponseInterface {
  meta: KakaoMeta;
  documents: KakaoAddressDocument[];
}
