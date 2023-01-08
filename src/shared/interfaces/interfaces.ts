export interface ISearchUser {
    userId: string;
    userName: string;
    userEmail: string;
    userSSN: string;
    userAccounrNum: string;
    assosiatedDeviceId:string;
    tin:string
    supplyNumber:string;
    devices:IDevice[];
  }

  export interface IDevice {
    deviceId: string;
    corespondingDeviceId: string;
    deviceFriendlyName: string;
  }

  export interface ISummaryCard {
    title: string;
    amount?: number;
    tips?: string;
  }

  export interface chartData {
    current_period: ICoordinates[];
    previous_period_total: number;
    current_period_total: IEstimationTotal;
    next_period_total: IEstimationTotal;
  }
  
  export interface ICoordinates {
    x: string;
    y: number;
  }
  
  export interface IEstimationTotal{
    valueTotal: number;
    valuePercentage:number;
  }