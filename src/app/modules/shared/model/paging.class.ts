export class Paging {
  public DEFAULT_TAKE: number = 10;

  public skip: number = 0;
  public take: number = this.DEFAULT_TAKE;
  public total: number = 0;

  constructor(skip?: number, take?: number, total?: number) {
    if (skip) {
      this.skip = skip;
    }

    if (take) {
      this.take = take;
    }

    if (take) {
      this.total = total ?? 0;
    }
  }

  public getPagedData(data: any[]): any[] {
    if (data === undefined || data === null || data.length === 0) {
      return [];
    }

    return data.slice(
      this.getSkip(),
      this.getSkip() + this.getTake()
    );
  }

  public setTotal(value: number): void {
    this.total = value;
  }

  public getTotal(): number {
    return this.total;
  }

  public setTake(value: number): void {
    this.take = value;
  }

  public getTake(): number {
    return this.take;
  }

  public setSkip(value: number): void {
    this.skip = value;
  }

  public getSkip(): number {
    return this.skip;
  }
}
