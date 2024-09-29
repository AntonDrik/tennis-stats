import { DataSource, EntityManager, Repository } from 'typeorm';
import { EntityTarget } from 'typeorm/common/EntityTarget';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

class BaseRepository<T extends ObjectLiteral> extends Repository<T> {
  protected dataSource: DataSource;

  constructor(type: EntityTarget<T>, dataSource: DataSource) {
    super(type, dataSource.createEntityManager());

    this.dataSource = dataSource;
  }

  public executeQuery<T>(query: string): Promise<T> {
    return this.query(query);
  }

  public withTransaction(
    fn: (entityManager: EntityManager) => Promise<void>,
    transactionManager?: EntityManager
  ) {
    if (transactionManager) {
      return fn(transactionManager);
    }

    return this.dataSource.transaction(fn);
  }
}

export default BaseRepository;
