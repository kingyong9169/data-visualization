declare namespace res {
  type Success<T> = {
    key: string;
    name: string;
    data: T;
  };
}
