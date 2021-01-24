import { Router, Request, Response } from 'express';
import db from '../../models/index';
import form from './formObj'

const router = Router();

router.get('/', async function(req: Request, res: Response) {
    try {
        const memos = await db.Memo.find({
            isDeleted: false
        });

        return res.json(memos);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/', async function(req: Request, res: Response) {
    const title: string = req.body.title;
    const content: string = req.body.content;

    if (!title)
        return res.status(400).send('title을 입력해주세요');
    if (!content)
        return res.status(400).send('content를 입력해 주세요');

    try {
        await db.Memo.create({
            title,
            content
        });

        return res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.put('/:id', async function(req: Request, res: Response) {
    const id: string = req.params.id;
    const title: string = req.body.title;
    const content: string = req.body.content;
    const update: form.Memo = {};

    if (title) 
        update.title = title;
    if (content) 
        update.content = content;
    if (!title && !content) 
        return res.status(400).send('수정할 content와 title을 입력해 주세요.');

    try {
        await db.Memo.updateOne({
            _id: id
        }, update);

        return res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err);
    }
})

router.delete('/:id', async function(req: Request, res: Response) {
    const id: string = req.params.id;

    try {
        const check = await db.Memo.findOne({
            _id: id
        });

        if (!check)
            return res.status(404).send('존재하지 않는 메모입니다.');

        await db.Memo.updateOne({
            _id: id,
            isDelete: false
        }, {
            isDelete: true
        });

        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;