import { Express } from 'express'
import env from './config/db-connection'
import cluster from 'cluster'
import { cpus, CpuInfo } from 'os'

export default (app: Express): void => {
  const coreThread: CpuInfo[] = cpus()
  if (cluster.isMaster) {
    console.log(`CPUs: ${coreThread.length}`)
    console.log(`Master: ${process.pid}`)

    coreThread.forEach(() => {
      cluster.fork()
    })

    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`)
      cluster.fork()
    })
  } else {
    app.listen(env.port, () => console.log(`server running at port ${env.port}`))
  }
}
