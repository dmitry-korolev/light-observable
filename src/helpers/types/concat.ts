// tslint:disable no-shadowed-variable
// prettier-ignore
export type Concat<AS extends any[], BS extends any[]> = AS extends [infer AA] ?
  BS extends [infer BA] ? [AA, BA] :
  BS extends [infer BA, infer BB] ? [AA, BA, BB] :
  BS extends [infer BA, infer BB, infer BC] ? [AA, BA, BB, BC] :
  BS extends [infer BA, infer BB, infer BC, infer BD] ? [AA, BA, BB, BC, BD] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE] ? [AA, BA, BB, BC, BD, BE] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF] ? [AA, BA, BB, BC, BD, BE, BF] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG] ? [AA, BA, BB, BC, BD, BE, BF, BG] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG, infer BH] ? [AA, BA, BB, BC, BD, BE, BF, BG, BH] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG, infer BH, infer BI] ? [AA, BA, BB, BC, BD, BE, BF, BG, BH, BI] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG, infer BH, infer BI, infer BK] ? [AA, BA, BB, BC, BD, BE, BF, BG, BH, BI, BK] :
  any[] :
AS extends [infer AA, infer AB] ?
  BS extends [infer BA] ? [AA, AB, BA] :
  BS extends [infer BA, infer BB] ? [AA, AB, BA, BB] :
  BS extends [infer BA, infer BB, infer BC] ? [AA, AB, BA, BB, BC] :
  BS extends [infer BA, infer BB, infer BC, infer BD] ? [AA, AB, BA, BB, BC, BD] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE] ? [AA, AB, BA, BB, BC, BD, BE] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF] ? [AA, AB, BA, BB, BC, BD, BE, BF] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG] ? [AA, AB, BA, BB, BC, BD, BE, BF, BG] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG, infer BH] ? [AA, AB, BA, BB, BC, BD, BE, BF, BG, BH] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG, infer BH, infer BI] ? [AA, AB, BA, BB, BC, BD, BE, BF, BG, BH, BI] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG, infer BH, infer BI, infer BK] ? [AA, AB, BA, BB, BC, BD, BE, BF, BG, BH, BI, BK] :
  any[] :
AS extends [infer AA, infer AB, infer AC] ?
  BS extends [infer BA] ? [AA, AB, AC, BA] :
  BS extends [infer BA, infer BB] ? [AA, AB, AC, BA, BB] :
  BS extends [infer BA, infer BB, infer BC] ? [AA, AB, AC, BA, BB, BC] :
  BS extends [infer BA, infer BB, infer BC, infer BD] ? [AA, AB, AC, BA, BB, BC, BD] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE] ? [AA, AB, AC, BA, BB, BC, BD, BE] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF] ? [AA, AB, AC, BA, BB, BC, BD, BE, BF] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG] ? [AA, AB, AC, BA, BB, BC, BD, BE, BF, BG] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG, infer BH] ? [AA, AB, AC, BA, BB, BC, BD, BE, BF, BG, BH] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG, infer BH, infer BI] ? [AA, AB, AC, BA, BB, BC, BD, BE, BF, BG, BH, BI] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG, infer BH, infer BI, infer BK] ? [AA, AB, AC, BA, BB, BC, BD, BE, BF, BG, BH, BI, BK] :
  any[] :
AS extends [infer AA, infer AB, infer AC, infer AD] ?
  BS extends [infer BA] ? [AA, AB, AC, AD, BA] :
  BS extends [infer BA, infer BB] ? [AA, AB, AC, AD, BA, BB] :
  BS extends [infer BA, infer BB, infer BC] ? [AA, AB, AC, AD, BA, BB, BC] :
  BS extends [infer BA, infer BB, infer BC, infer BD] ? [AA, AB, AC, AD, BA, BB, BC, BD] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE] ? [AA, AB, AC, AD, BA, BB, BC, BD, BE] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF] ? [AA, AB, AC, AD, BA, BB, BC, BD, BE, BF] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG] ? [AA, AB, AC, AD, BA, BB, BC, BD, BE, BF, BG] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG, infer BH] ? [AA, AB, AC, AD, BA, BB, BC, BD, BE, BF, BG, BH] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG, infer BH, infer BI] ? [AA, AB, AC, AD, BA, BB, BC, BD, BE, BF, BG, BH, BI] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG, infer BH, infer BI, infer BK] ? [AA, AB, AC, AD, BA, BB, BC, BD, BE, BF, BG, BH, BI, BK] :
  any[] :
AS extends [infer AA, infer AB, infer AC, infer AD, infer AE] ?
  BS extends [infer BA] ? [AA, AB, AC, AD, AE, BA] :
  BS extends [infer BA, infer BB] ? [AA, AB, AC, AD, AE, BA, BB] :
  BS extends [infer BA, infer BB, infer BC] ? [AA, AB, AC, AD, AE, BA, BB, BC] :
  BS extends [infer BA, infer BB, infer BC, infer BD] ? [AA, AB, AC, AD, AE, BA, BB, BC, BD] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE] ? [AA, AB, AC, AD, AE, BA, BB, BC, BD, BE] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF] ? [AA, AB, AC, AD, AE, BA, BB, BC, BD, BE, BF] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG] ? [AA, AB, AC, AD, AE, BA, BB, BC, BD, BE, BF, BG] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG, infer BH] ? [AA, AB, AC, AD, AE, BA, BB, BC, BD, BE, BF, BG, BH] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG, infer BH, infer BI] ? [AA, AB, AC, AD, AE, BA, BB, BC, BD, BE, BF, BG, BH, BI] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG, infer BH, infer BI, infer BK] ? [AA, AB, AC, AD, AE, BA, BB, BC, BD, BE, BF, BG, BH, BI, BK] :
  any[] :
AS extends [infer AA, infer AB, infer AC, infer AD, infer AE, infer AF] ?
  BS extends [infer BA] ? [AA, AB, AC, AD, AE, AF, BA] :
  BS extends [infer BA, infer BB] ? [AA, AB, AC, AD, AE, AF, BA, BB] :
  BS extends [infer BA, infer BB, infer BC] ? [AA, AB, AC, AD, AE, AF, BA, BB, BC] :
  BS extends [infer BA, infer BB, infer BC, infer BD] ? [AA, AB, AC, AD, AE, AF, BA, BB, BC, BD] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE] ? [AA, AB, AC, AD, AE, AF, BA, BB, BC, BD, BE] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF] ? [AA, AB, AC, AD, AE, AF, BA, BB, BC, BD, BE, BF] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG] ? [AA, AB, AC, AD, AE, AF, BA, BB, BC, BD, BE, BF, BG] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG, infer BH] ? [AA, AB, AC, AD, AE, AF, BA, BB, BC, BD, BE, BF, BG, BH] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG, infer BH, infer BI] ? [AA, AB, AC, AD, AE, AF, BA, BB, BC, BD, BE, BF, BG, BH, BI] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG, infer BH, infer BI, infer BK] ? [AA, AB, AC, AD, AE, AF, BA, BB, BC, BD, BE, BF, BG, BH, BI, BK] :
  any[] :
AS extends [infer AA, infer AB, infer AC, infer AD, infer AE, infer AF, infer AG] ?
  BS extends [infer BA] ? [AA, AB, AC, AD, AE, AF, AG, BA] :
  BS extends [infer BA, infer BB] ? [AA, AB, AC, AD, AE, AF, AG, BA, BB] :
  BS extends [infer BA, infer BB, infer BC] ? [AA, AB, AC, AD, AE, AF, AG, BA, BB, BC] :
  BS extends [infer BA, infer BB, infer BC, infer BD] ? [AA, AB, AC, AD, AE, AF, AG, BA, BB, BC, BD] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE] ? [AA, AB, AC, AD, AE, AF, AG, BA, BB, BC, BD, BE] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF] ? [AA, AB, AC, AD, AE, AF, AG, BA, BB, BC, BD, BE, BF] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG] ? [AA, AB, AC, AD, AE, AF, AG, BA, BB, BC, BD, BE, BF, BG] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG, infer BH] ? [AA, AB, AC, AD, AE, AF, AG, BA, BB, BC, BD, BE, BF, BG, BH] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG, infer BH, infer BI] ? [AA, AB, AC, AD, AE, AF, AG, BA, BB, BC, BD, BE, BF, BG, BH, BI] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG, infer BH, infer BI, infer BK] ? [AA, AB, AC, AD, AE, AF, AG, BA, BB, BC, BD, BE, BF, BG, BH, BI, BK] :
  any[] :
AS extends [infer AA, infer AB, infer AC, infer AD, infer AE, infer AF, infer AG, infer AH] ?
  BS extends [infer BA] ? [AA, AB, AC, AD, AE, AF, AG, AH, BA] :
  BS extends [infer BA, infer BB] ? [AA, AB, AC, AD, AE, AF, AG, AH, BA, BB] :
  BS extends [infer BA, infer BB, infer BC] ? [AA, AB, AC, AD, AE, AF, AG, AH, BA, BB, BC] :
  BS extends [infer BA, infer BB, infer BC, infer BD] ? [AA, AB, AC, AD, AE, AF, AG, AH, BA, BB, BC, BD] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE] ? [AA, AB, AC, AD, AE, AF, AG, AH, BA, BB, BC, BD, BE] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF] ? [AA, AB, AC, AD, AE, AF, AG, AH, BA, BB, BC, BD, BE, BF] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG] ? [AA, AB, AC, AD, AE, AF, AG, AH, BA, BB, BC, BD, BE, BF, BG] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG, infer BH] ? [AA, AB, AC, AD, AE, AF, AG, AH, BA, BB, BC, BD, BE, BF, BG, BH] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG, infer BH, infer BI] ? [AA, AB, AC, AD, AE, AF, AG, AH, BA, BB, BC, BD, BE, BF, BG, BH, BI] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG, infer BH, infer BI, infer BK] ? [AA, AB, AC, AD, AE, AF, AG, AH, BA, BB, BC, BD, BE, BF, BG, BH, BI, BK] :
  any[] :
AS extends [infer AA, infer AB, infer AC, infer AD, infer AE, infer AF, infer AG, infer AH, infer AI] ?
  BS extends [infer BA] ? [AA, AB, AC, AD, AE, AF, AG, AH, AI, BA] :
  BS extends [infer BA, infer BB] ? [AA, AB, AC, AD, AE, AF, AG, AH, AI, BA, BB] :
  BS extends [infer BA, infer BB, infer BC] ? [AA, AB, AC, AD, AE, AF, AG, AH, AI, BA, BB, BC] :
  BS extends [infer BA, infer BB, infer BC, infer BD] ? [AA, AB, AC, AD, AE, AF, AG, AH, AI, BA, BB, BC, BD] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE] ? [AA, AB, AC, AD, AE, AF, AG, AH, AI, BA, BB, BC, BD, BE] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF] ? [AA, AB, AC, AD, AE, AF, AG, AH, AI, BA, BB, BC, BD, BE, BF] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG] ? [AA, AB, AC, AD, AE, AF, AG, AH, AI, BA, BB, BC, BD, BE, BF, BG] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG, infer BH] ? [AA, AB, AC, AD, AE, AF, AG, AH, AI, BA, BB, BC, BD, BE, BF, BG, BH] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG, infer BH, infer BI] ? [AA, AB, AC, AD, AE, AF, AG, AH, AI, BA, BB, BC, BD, BE, BF, BG, BH, BI] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG, infer BH, infer BI, infer BK] ? [AA, AB, AC, AD, AE, AF, AG, AH, AI, BA, BB, BC, BD, BE, BF, BG, BH, BI, BK] :
  any[] :
AS extends [infer AA, infer AB, infer AC, infer AD, infer AE, infer AF, infer AG, infer AH, infer AI, infer AJ] ?
  BS extends [infer BA] ? [AA, AB, AC, AD, AE, AF, AG, AH, AI, AJ, BA] :
  BS extends [infer BA, infer BB] ? [AA, AB, AC, AD, AE, AF, AG, AH, AI, AJ, BA, BB] :
  BS extends [infer BA, infer BB, infer BC] ? [AA, AB, AC, AD, AE, AF, AG, AH, AI, AJ, BA, BB, BC] :
  BS extends [infer BA, infer BB, infer BC, infer BD] ? [AA, AB, AC, AD, AE, AF, AG, AH, AI, AJ, BA, BB, BC, BD] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE] ? [AA, AB, AC, AD, AE, AF, AG, AH, AI, AJ, BA, BB, BC, BD, BE] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF] ? [AA, AB, AC, AD, AE, AF, AG, AH, AI, AJ, BA, BB, BC, BD, BE, BF] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG] ? [AA, AB, AC, AD, AE, AF, AG, AH, AI, AJ, BA, BB, BC, BD, BE, BF, BG] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG, infer BH] ? [AA, AB, AC, AD, AE, AF, AG, AH, AI, AJ, BA, BB, BC, BD, BE, BF, BG, BH] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG, infer BH, infer BI] ? [AA, AB, AC, AD, AE, AF, AG, AH, AI, AJ, BA, BB, BC, BD, BE, BF, BG, BH, BI] :
  BS extends [infer BA, infer BB, infer BC, infer BD, infer BE, infer BF, infer BG, infer BH, infer BI, infer BK] ? [AA, AB, AC, AD, AE, AF, AG, AH, AI, AJ, BA, BB, BC, BD, BE, BF, BG, BH, BI, BK] :
  any[] :
any[]
