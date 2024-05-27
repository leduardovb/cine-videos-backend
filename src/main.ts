import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { ENVIRONMENT } from './configurations/environment.configuration'
import qs from 'qs'

async function main() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ querystringParser: (str) => qs.parse(str) }))

  app.enableCors(
    ENVIRONMENT.ALLOW_ALL_ORIGINS_ON_CORS
      ? undefined
      : {
          allowedHeaders: '*',
          origin: /^(https:\/\/([^\.]*\.)?innocenti\.com\.br)$/i,
          credentials: true,
        },
  )
  await app.listen(ENVIRONMENT.PORT, '0.0.0.0')
}
main()
