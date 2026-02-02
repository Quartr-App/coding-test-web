import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/base.entity';
import { TABLES } from '../../../common/constant';
import { Event } from './event.entity';

@Entity(TABLES.company)
export class Company extends BaseEntity {
  @Column({ type: 'int', unique: true })
  companyId: number;

  @Column({ type: 'varchar' })
  companyName: string;

  @Column({ type: 'varchar', length: 2 })
  companyCountry: string;

  @Column({ type: 'varchar', nullable: true })
  companyTicker: string | null;

  @Column({ type: 'varchar' })
  displayName: string;

  @Column({ type: 'varchar', nullable: true })
  infoUrl: string | null;

  @Column({ type: 'varchar', nullable: true })
  liveUrl: string | null;

  @Column({ type: 'varchar', nullable: true })
  logoLightUrl: string | null;

  @Column({ type: 'varchar', nullable: true })
  logoDarkUrl: string | null;

  @Column({ type: 'varchar', nullable: true })
  iconUrl: string | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', length: 8, nullable: true })
  reportingCurrency: string | null;

  @Column({ type: 'varchar', nullable: true })
  brandColor: string | null;

  @Column('text', { array: true, default: () => 'ARRAY[]::text[]' })
  isins: string[];

  @OneToMany(() => Event, (event) => event.company)
  events: Event[];
}
