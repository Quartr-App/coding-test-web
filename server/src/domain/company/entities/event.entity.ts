import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../../common/base.entity';
import { TABLES } from '../../../common/constant';
import { Company } from './company.entity';

@Entity(TABLES.event)
export class Event extends BaseEntity {
  @Column({ type: 'int', unique: true })
  eventId: number;

  @Column({ type: 'varchar' })
  eventTitle: string;

  @Column({ type: 'timestamptz' })
  eventDate: Date;

  @Column({ type: 'varchar', nullable: true })
  reportUrl: string | null;

  @Column({ type: 'varchar', nullable: true })
  pdfUrl: string | null;

  @Column({ type: 'varchar', nullable: true })
  audioUrl: string | null;

  @Column({ type: 'int', nullable: true })
  qnaTimestamp: number | null;

  @Column({ type: 'varchar', nullable: true })
  fiscalPeriod: string | null;

  @Column({ type: 'varchar', nullable: true })
  fiscalYear: string | null;

  @ManyToOne(() => Company, (company) => company.events, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
