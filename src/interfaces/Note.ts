export interface INote extends INoteWithoutID {
  id: string;
}

export interface INoteWithoutID {
  title?: string;
  text: string;
  color: 'yellow' | 'green' | 'blue' | 'purple';
  date: {
    seconds: number;
    nanoseconds: number;
  };
}
