const fs = require('node:fs/promises')
const path = require('node:path')
const pc = require('picocolors')

const folder = process.argv[2] ?? '.' //* Carpeta a listar, por defecto es el directorio actual

async function ls (folder) {
  let files
  try {
    files = await fs.readdir(folder)
  } catch {
    console.error(pc.red(`❌ Error al leer el directorio: ${folder}`))
    process.exit(1) //* Salimos con error
  }

  const filesPromises = files.map(async file => {
    const filePath = path.join(folder, file)
    let stats
    try {
      stats = await fs.stat(filePath)
    } catch {
      console.error(pc.red(`❌ Error al obtener el estado del archivo: ${filePath}`))
      process.exit(1) //* Salimos con error
    }

    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? 'dir' : 'file'
    const fileSize = stats.size.toString()
    const fileModifiedTime = stats.mtime.toLocaleString()

    return `${fileType} ${pc.blue(file.padEnd(20))} ${pc.green(fileSize.toString().padStart(10))} ${pc.yellow(fileModifiedTime)}`
  })

  const filesInfo = await Promise.all(filesPromises)

  filesInfo.forEach(fileInfo => {
    console.log(fileInfo)
  })
}

ls(folder)
