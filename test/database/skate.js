import {withIdBqt, withId, withDbTrunk} from "test-api-express-mongo/dist/domain"
import {cols} from "../../src/const/collections"

export const skateTrunk = withDbTrunk("skate", "999903c03e77667641d99990", 10, "Nomb")
export const plancheTrunk = withDbTrunk("planche", "999903c03e77667641d99991", 16, "Nomb")
export const boisTrunk = withDbTrunk("bois", "999903c03e77667641d99995", 5, "t")
export const arbreTrunk = withDbTrunk("arbre", "999903c03e77667641d99996", 1, "Nomb")
export const rouletteTrunk = withDbTrunk("roulette", "999903c03e77667641d99992", 4, "Nomb")
export const elecTrunk = withDbTrunk("elec", "999903c03e77667641d99993", 861244.02, "Ener")
export const eauTrunk = withDbTrunk("eau", "999903c03e77667641d99994", 6, "L")
export const foretTrunk = withDbTrunk("foret", "999903c03e77667641d99997", 1, "Nomb")
export const bucheTrunk = withDbTrunk("buche", "999903c03e77667641d99998", 10000, "Mass")
export const chauffageTrunk = withDbTrunk("chauffage", "999903c03e77667641d99999", 1, "j")
export const grandeForetTrunk = withDbTrunk("Grande forêt", "999903c03e77667641d99910", 1000, "Surf")
export const refugeBioTrunk = withDbTrunk("Refuge de biodiversité", "999903c03e77667641d99911", 4, "Nomb")
export const planeteTrunk = withDbTrunk("Planète", "999903c03e77667641d99912", 1, "Nomb")
export const systemeTrunk = withDbTrunk("Système", "999903c03e77667641d99913", 1, "Nomb")

export const skateRoot = {...withIdBqt(skateTrunk._id, 1), items: [withIdBqt(plancheTrunk._id, 1), withIdBqt(rouletteTrunk._id, 4)]}
const plancheRoot = {...withIdBqt(plancheTrunk._id, 1000), items: [withIdBqt(eauTrunk._id, 1), withIdBqt(elecTrunk._id, 10000*861244.02), withIdBqt(boisTrunk._id, 500000)]}
const boisRoot = {...withIdBqt(boisTrunk._id, 1000000), items: [withIdBqt(arbreTrunk._id, 1)]}
const rouletteRoot = {...withIdBqt(rouletteTrunk._id, 1000000), items: [withIdBqt(eauTrunk._id, 1.5), withIdBqt(elecTrunk._id, 20000*861244.02)]}

const plancheBranch = {...withIdBqt(plancheTrunk._id, 1), items: [withIdBqt(skateTrunk._id, 1)]}
const rouletteBranch = {...withIdBqt(rouletteTrunk._id, 1), items: [withIdBqt(skateTrunk._id, 0.25)]}
const eauBranch = {...withIdBqt(eauTrunk._id, 1500, "L"), items: [withIdBqt(plancheTrunk._id, 1500), withIdBqt(rouletteTrunk._id, 1000000)]}
const elecBranch = {...withIdBqt(elecTrunk._id, 861244.02*10), items: [withIdBqt(plancheTrunk._id, 1), withIdBqt(rouletteTrunk._id, 50)]}
export const boisBranch = {...withIdBqt(boisTrunk._id, 500000), items: [withIdBqt(plancheTrunk._id, 1000), withIdBqt(bucheTrunk._id, 500000)]}
const arbreBranch = {...withIdBqt(arbreTrunk._id, 1), items: [withIdBqt(boisTrunk._id, 1000000), withIdBqt(foretTrunk._id, 0.001)]}
const bucheBranch = {...withIdBqt(bucheTrunk._id, 3000), items: [withIdBqt(chauffageTrunk._id, 3600)]}
const foretBranch = {...withIdBqt(foretTrunk._id, 3), items: [withId(grandeForetTrunk._id)]}
const grandeForetBranch = {...withIdBqt(grandeForetTrunk._id, 10), items: [withIdBqt(refugeBioTrunk._id, 1)]}

export const database = {
    [cols.TRUNK]: [skateTrunk, plancheTrunk, boisTrunk, arbreTrunk, rouletteTrunk, elecTrunk, eauTrunk, foretTrunk, bucheTrunk, chauffageTrunk, grandeForetTrunk, refugeBioTrunk, planeteTrunk, systemeTrunk],
    [cols.ROOT]: [skateRoot, plancheRoot, boisRoot, rouletteRoot],
    [cols.BRANCH]: [plancheBranch, rouletteBranch, eauBranch, elecBranch, boisBranch, arbreBranch, bucheBranch, foretBranch, grandeForetBranch]
}
