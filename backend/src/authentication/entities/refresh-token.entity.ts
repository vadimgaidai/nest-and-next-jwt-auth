import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('refresh_token')
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    type: 'varchar',
    unique: true,
    nullable: true,
  })
  user_id!: number

  @Column({ type: 'varchar', nullable: true })
  refresh_token: string

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}
