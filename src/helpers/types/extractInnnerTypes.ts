// tslint:disable no-shadowed-variable
import { Subscribable } from '../../core/types.h'

export type ExtractInnerTypes<TS extends Array<Subscribable<any>>> = TS extends []
  ? []
  : TS extends [Subscribable<infer A>]
    ? [A]
    : TS extends [Subscribable<infer A>, Subscribable<infer B>]
      ? [A, B]
      : TS extends [Subscribable<infer A>, Subscribable<infer B>, Subscribable<infer C>]
        ? [A, B, C]
        : TS extends [
            Subscribable<infer A>,
            Subscribable<infer B>,
            Subscribable<infer C>,
            Subscribable<infer D>
          ]
          ? [A, B, C, D]
          : TS extends [
              Subscribable<infer A>,
              Subscribable<infer B>,
              Subscribable<infer C>,
              Subscribable<infer D>,
              Subscribable<infer E>
            ]
            ? [A, B, C, D, E]
            : TS extends [
                Subscribable<infer A>,
                Subscribable<infer B>,
                Subscribable<infer C>,
                Subscribable<infer D>,
                Subscribable<infer E>,
                Subscribable<infer F>
              ]
              ? [A, B, C, D, E, F]
              : TS extends [
                  Subscribable<infer A>,
                  Subscribable<infer B>,
                  Subscribable<infer C>,
                  Subscribable<infer D>,
                  Subscribable<infer E>,
                  Subscribable<infer F>,
                  Subscribable<infer G>
                ]
                ? [A, B, C, D, E, F, G]
                : TS extends [
                    Subscribable<infer A>,
                    Subscribable<infer B>,
                    Subscribable<infer C>,
                    Subscribable<infer D>,
                    Subscribable<infer E>,
                    Subscribable<infer F>,
                    Subscribable<infer G>,
                    Subscribable<infer H>
                  ]
                  ? [A, B, C, D, E, F, G, H]
                  : TS extends [
                      Subscribable<infer A>,
                      Subscribable<infer B>,
                      Subscribable<infer C>,
                      Subscribable<infer D>,
                      Subscribable<infer E>,
                      Subscribable<infer F>,
                      Subscribable<infer G>,
                      Subscribable<infer H>,
                      Subscribable<infer I>
                    ]
                    ? [A, B, C, D, E, F, G, H, I]
                    : TS extends [
                        Subscribable<infer A>,
                        Subscribable<infer B>,
                        Subscribable<infer C>,
                        Subscribable<infer D>,
                        Subscribable<infer E>,
                        Subscribable<infer F>,
                        Subscribable<infer G>,
                        Subscribable<infer H>,
                        Subscribable<infer I>,
                        Subscribable<infer J>
                      ]
                      ? [A, B, C, D, E, F, G, H, I, J]
                      : any[]
