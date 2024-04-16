/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express from 'express'
import { createWidget, deleteWidgetById, getWidgetById, getwidgetssByScreenId } from '../db/widgets'

const typesOfWidgets = ['barGraph', 'pieGraph', 'table', 'card']

export const newWidget = async (req: express.Request, res: express.Response) => {
  try {
    const { name, screenId, type } = req.body
    let widget: any
    if (!screenId || !name || !type) {
      return res.sendStatus(400)
    }

    if (!typesOfWidgets.includes(type)) {
      const src = ''
      widget = await createWidget({
        screenId,
        name,
        type,
        src
      })
    } else {
      const values: any[] = []
      widget = await createWidget({
        screenId,
        name,
        type,
        values
      })
    }

    return res.status(200).json(widget).end()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export const getAllWidgetsByScreen = async (req: express.Request, res: express.Response) => {
  try {
    const { screenId } = req.body

    const widgets = await getwidgetssByScreenId(screenId)

    return res.status(200).json(widgets)
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export const getOneWidgetById = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params

    const widget = await getWidgetById(id)

    return res.status(200).json(widget)
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export const deleteWidget = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params

    const deletedWidget = await deleteWidgetById(id)

    return res.json(deletedWidget)
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export const updateWidget = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params
    const { type, name } = req.body

    const widget = await getWidgetById(id)

    widget.name = name
    widget.type = type

    await widget.save()

    return res.status(200).json(widget).end()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}
