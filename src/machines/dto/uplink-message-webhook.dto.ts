export class UplinkMessageWebHookDto {
  end_device_ids: EndDeviceIDS;
  correlation_ids: string[];
  received_at: Date;
  uplink_message: UplinkMessage;
}

export class EndDeviceIDS {
  device_id: string;
  application_ids: ApplicationIDS;
  dev_eui: string;
  join_eui: string;
  dev_addr: string;
}

export class ApplicationIDS {
  application_id: string;
}

export class UplinkMessage {
  session_key_id: string;
  f_port: number;
  frm_payload: string;
  decoded_payload: DecodedPayload;
  decoded_payload_warnings: any[];
  rx_metadata: RxMetadatum[];
  settings: Settings;
  received_at: Date;
  consumed_airtime: string;
  locations: Locations;
  version_ids: VersionIDS;
  network_ids: NetworkIDS;
}

export class DecodedPayload {
  latitude: number;
  longitude: number;
  machineUUID: string;
  ss: number;
}

export class Locations {
  'frm-payload': FrmPayload;
}

export class FrmPayload {
  latitude: number;
  longitude: number;
  source: string;
}

export class NetworkIDS {
  net_id: string;
  tenant_id: string;
  cluster_id: string;
}

export class RxMetadatum {
  gateway_ids: GatewayIDS;
  timestamp: number;
  rssi: number;
  channel_rssi: number;
  snr: number;
  uplink_token: string;
  channel_index: number;
}

export class GatewayIDS {
  gateway_id: string;
  eui: string;
}

export class Settings {
  data_rate: DataRate;
  data_rate_index: number;
  coding_rate: string;
  frequency: string;
  timestamp: number;
}

export class DataRate {
  lora: Lora;
}

export class Lora {
  bandwidth: number;
  spreading_factor: number;
}

export class VersionIDS {
  brand_id: string;
  model_id: string;
  hardware_version: string;
  firmware_version: string;
  band_id: string;
}
