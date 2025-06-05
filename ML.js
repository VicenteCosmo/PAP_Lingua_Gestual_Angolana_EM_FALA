import * as tf from '@tensorflow/tfjs'
import e from 'express'
import fs from 'fs'

class ML {
    constructor(parameters) {
        this.trainModel()
    }

    model = tf.sequential()

    xsDatas = [
        [197, 124, 166, 167], //gesture1
        [268, 227, 267, 256], //gesture1
        [208, 149, 192, 220], //gesture1
        [213, 131, 173, 174], //gesture1
        [187, 133, 175, 192], //gesture1
        [231, 237, 267, 251], //gesture1
        [262, 124, 180, 205], //gesture1
        [265, 235, 226, 236], //gesture1
        [176, 191, 0, 256], //gesture1
        [265, 100, 173, 179], //gesture1
        [267, 237, 272, 238], //gesture1
        [262, 237, 240, 241], //gesture1
        [202, 154, 208, 225], //gesture1
        [197, 124, 166, 167], //gesture1
        [197, 124, 166, 167], //gesture1
        [197, 124, 166, 167], //gesture1
        [197, 124, 166, 167], //gesture1
        [197, 124, 166, 167], //gesture1
        [197, 124, 166, 167], //gesture1
        [197, 124, 166, 167],, //gesture1
      ]

      ysDatas = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      ]

      // vocabulary = [a, b, c, d, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z]

    loadDataForTraining() {
        const readFile = fs.readFileSync('dataForTraining.json')
        const parseData = JSON.parse(readFile)
        const input = parseData.map( x => x.input/1000 )

        return input
    }

    xs = this.xsDatas
    ys = this.ysDatas

    xsTensor = tf.tensor2d(this.xs)
    ysTensor = tf.tensor2d(this.ys, [1, 20], 'int32')

    xsTrain = tf.slice(this.xsTensor, 0, Math.floor(this.xs.length*0.8))
    ysTrain = tf.slice(this.xsTensor, 0, Math.floor(this.xs.length*0.8))

    xsValidation = tf.slice(this.xsTensor, 0, Math.floor(this.xs.length - this.xs.length*0.8))
    ysValidation = tf.slice(this.xsTensor, 0, Math.floor(this.xs.length - this.xs.length*0.8))

    async trainModel() {

        const hidden = tf.layers.dense({
          units: 10,
          inputShape: [4],
          activation: 'relu'
        })
      
        const outputModel = tf.layers.dense({
          units: 4,
          activation: 'sigmoid'
        })
      
        this.model.add(hidden)
        this.model.add(outputModel)
      
        this.model.compile({
          optimizer: 'adam',
          loss: tf.losses.softmaxCrossEntropy,
          validation: [this.xsValidation, this.ysValidation],
          metrics: ['accuracy']
        })
      
      
        await this.model.fit(this.xsTrain, this.ysTrain, {
          epochs: 100
        })
      }

      async testModel(a, b, c, d){

        const inputTensor = tf.tensor2d([a, b, c, d], [1, 4])

        const predict = this.model.predict(inputTensor)

        const result = await predict.data()
 
        const index = result.indexOf(Math.max(...result))
        console.log('result:', result)
        console.log('index:',index)

        // predict.print()

      }

}

export default ML