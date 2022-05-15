import { Column, Entity } from 'typeorm'

@Entity('refresh_token')
export class RefreshTokenEntity {
  @Column()
  user_id: number

  @Column()
  is_revoked: boolean

  @Column()
  expiresIn: Date
}
