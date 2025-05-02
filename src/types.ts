export type Tag = {
    name: any;
    id: number;
};

export type Note = {
    name: any;
    desc: any;
    tags: Tag[];
    id: number;
};
