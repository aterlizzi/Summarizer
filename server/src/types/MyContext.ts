export interface MyContext {
  req: Record<string, any>;
  reply: any;
  redis: any;
}
