export class Station {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly obcn: string,
    public readonly location: string,
    public readonly latitude: number,
    public readonly longitude: number,
    public readonly status: string,
  ) {}
}

export const StationSessionName = 'Station';
