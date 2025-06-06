/**
 * Uma `Entry` é a representação de um registro
 * comum em um repositório de dados. Em termos gerais,
 * é como se fosse uma linha em uma tabela de banco de dados,
 * porém aqui ela é agnóstica ao sistema de persistência.
 *
 * Com a propriedade `id`, ela reforça a ideia de que ao
 * persistir uma entidade, ela deve ter um identificador
 * único. As propriedades `createdAt` e `updatedAt` são
 * utilizadas para rastrear quando a entidade foi criada
 * e atualizada, respectivamente.
 */
export type Entry<T> = T & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type EntrySearchParams<T> = Partial<
  T & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
  }
>;
