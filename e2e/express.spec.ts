import * as request from 'supertest'
import { ExpressServer } from '../src/server'
import { LogLevel } from '@vramework/core'

const setupTestAgent = async () => {
    const vrameworkServer = new ExpressServer()
    vrameworkServer.logger.setLevel(LogLevel.critical)
    await vrameworkServer.start()

    const agent = request.agent(vrameworkServer.server);

    await agent
        .post('/book')
        .send({
            title: "Writing tests with vramework",
            author: "Vramework",
            year: 2024
        })
        .expect(200)

    await agent
        .post('/book')
        .send({
            title: "Writing different with vramework",
            author: "Vramework",
            year: 2023
        })
        .expect(200)

    return agent
}

describe('Books', function () {
    let agent: request.Agent

    beforeEach(async () => {
        agent = await setupTestAgent()
    })

    it('creates books', async () => {
        await agent
            .post('/book')
            .send({
                title: "Writing a third book with vramework",
                author: "Vramework",
                year: 2023
            })
            .expect(200)
    })

    it('gets books', async () => {
        await agent
            .get('/books')
            .expect(200, [
                {
                    id: '1',
                    title: 'Writing tests with vramework',
                    author: 'Vramework',
                    year: 2024
                },
                {
                    id: '2',
                    title: 'Writing different with vramework',
                    author: 'Vramework',
                    year: 2023
                }
            ]
            )
    })

    it('gets one book', async () => {
        await agent
            .get('/book/1')
            .expect(200, {
                id: '1',
                title: 'Writing tests with vramework',
                author: 'Vramework',
                year: 2024
            })
    })

    it('updates one book', async () => {
        await agent
            .patch('/book/1')
            .send({
                author: 'Bob Simons',
                year: 2023
            })

        await agent
            .get('/book/1')
            .expect(200, {
                id: '1',
                title: 'Writing tests with vramework',
                author: 'Bob Simons',
                year: 2023
            })
    })

    it('deletes one book', async () => {
        await agent
            .del('/book/1')
            .expect(200)

        await agent
            .get('/book/1')
            .expect(404)
    })
})
