export interface AllGraph {
  dataMicro: {
    time_stamp: string;
    acc: string;
    temp: string;
  }[];
  closeConnection: (isDisconnect: boolean) => void;
}
