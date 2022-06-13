import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { artistsData } from "./seedData";

const prisma = new PrismaClient();

const run = async () => {
  await Promise.all(
    artistsData.map(async (artist) => {
      return prisma.artist.upsert({
        where: {
          name: artist.name
        },
        update: {},
        create: {
          name: artist.name,
          songs: {
            create: artist.songs.map((song) => ({
              name: song.name,
              duration: song.duration,
              url: song.url,
            })),
          },
        },
      });
    })
  );

  const salt = bcrypt.genSaltSync(10);
  const user = await prisma.user.upsert({
    where: {
        email: "naheem@gmail.com"
    },
    update: {},
    create: {
        email: "naheem@gmail.com",
        password: bcrypt.hashSync("123456", salt),
    }

   });

    const songs = await prisma.song.findMany({})
    await Promise.all(new Array(10).fill(2).map((_, i) => {
        return prisma.playlist.create({
            data: {
                name: `Playlist ${i +1}`,
                user: {
                    connect: {
                        id: user.id
                    }
                },
                songs: {
                    connect: songs.map(song => ({
                        id: song.id
                    }))
                }
            }
        })
    }))
}

run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
