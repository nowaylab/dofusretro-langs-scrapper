/**
 * Base URL for Dofus Retro langs files
 * -> http://dl.ak.ankama.com/games/dofusretro/lang/
 * 
 * Get FR langs list : http://dl.ak.ankama.com/games/dofusretro/lang/versions_fr.txt
 * Same for all languages by remplacing _fr.txt by _lg.txt (en, es...)
 */
const fs = require('fs')
const { resolve } = require('path')
const axios = require('axios')

const store = {
    versions: {},
}

const BASE_URL = 'http://dl.ak.ankama.com/games/dofusretro/lang'
const LANGUAGES = ['fr', 'en', 'es', 'pt', 'de', 'it']

async function fetchAndSaveAll() {
    await fetchAllVersionsFiles()
    await fetchAllLangsFiles()
}

async function fetchAllLangsFiles() {
    for (let langKey in store.versions) {
        const versionsTxt = store.versions[langKey].slice(3)
        const arrayLangs = versionsTxt.split('|')
        for (let langInfos of arrayLangs) {
            const infos = langInfos.split(',')
            const fileName = infos.join('_')
            console.log(fileName)
            if (fileName == '') {
                continue ;
            }
            try {
                const {data} = await axios.get(`${BASE_URL}/swf/${fileName}.swf`, {
                    responseType: 'arraybuffer',
                })
                console.log(data)
                fs.writeFile(resolve(__dirname, 'output', 'swf', `${fileName}.swf`), data,() => {
                    console.log(`${fileName}.swf`, 'saved');
                    return true
                })
            }
            catch (err) {
                console.error(err)
                console.error(`impossible to fetch lang file ${infos}`)
            }
        }
    }
}

async function fetchAllVersionsFiles() {
    for (let language of LANGUAGES) {
        try {
            const {data} = await axios.get(`${BASE_URL}/versions_${language}.txt`)
            store.versions[language] = data
            fs.writeFile(resolve(__dirname, 'output', `versions_${language}.txt`), data,() => {
                console.log(`versions_${language}.txt`, 'saved');
                return true
            })
        }
        catch (err) {
            console.error(err)
            console.error(`impossible to fetch version file for language ${language}`)
        }
    }
}

fetchAndSaveAll()