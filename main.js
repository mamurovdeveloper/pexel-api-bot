const axios = require("axios");

require('dotenv').config()

const TOKEN = process.env.TOKEN;

const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on('message', async (message) => {
  try {
    const chatId = await message.chat.id
    const name = await message.from.first_name
    const username = await message.from.username
    if (message.text) {
      if (message.text == '/start') {
        await bot.sendMessage(chatId, `Salom ${name}.Menga kalitso'z yuboraman va men shu sozga mos rasm yuboraman. \n\n  Hello ${name}. Send me a keynote and I'll send you a picture to match. `)
      }
      else {
        async function secrch() {
          const API_KEY = "563492ad6f917000010000011d289017e2cf4800845984d427bd58a6"
          const data = await fetch(`https://api.pexels.com/v1/search?query=${message.text}`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: API_KEY
            }
          })
          const response = await data.json()
          console.log(response.photos)
          let length = response.photos.length
          console.log(length)
          for (let len = 1; len < length; len++) {
            console.log(image_url)
            var photographer = await response.photos[len].photographer_url
            var image_url = await response.photos[len].src.large2x
            await bot.sendPhoto(chatId, image_url, { parse_mode: 'HTML', caption: `<b>Photographer is</b> ${photographer}. \n\n Saved by @photoFinderBx2bot` })
          }

        }
        secrch()
      }
    }
    else{
      await bot.sendMessage(chatId, '<b>Please send text!</b>', {parse_mode: 'HTML'})
    }
  }
  catch (error) {
     await bot.sendMessage(912132231, error)
  }
})

