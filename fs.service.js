const fs = require('node:fs/promises');
const path = require('node:path')

module.exports = {
    reader: async () => {
const buffer = await fs.readFile(path.join(process.cwd(), 'dataBase', 'users.json'))
    const data = buffer.toString();
    return data ? JSON.parse(data) : [];
    },

    writer: async (users) => {
    await fs.writeFile(path.join(process.cwd(), 'dataBase', 'users.json'), JSON.stringify(users))
    }
}