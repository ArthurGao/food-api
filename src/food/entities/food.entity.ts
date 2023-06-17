import { Entity, Column, PrimaryGeneratedColumn, Unique, Index } from 'typeorm';

@Entity()
@Index('UQ_Title', ['title'], { unique: true })
export class Food {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  quantity: number;

  @Column({
    name: 'created_date',
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdDate: Date;
}
