import {cols} from "../../src/const/collections"
import {vitBFacetEntry, vitCFacetEntry} from "./facetEntries"
import {withIdBqt, withDbTrunk} from "test-api-express-mongo/dist/domain"
import {vitBImpactEntry, vitCImpactEntry} from "./impactEntries"

export const gateauTrunk = withDbTrunk("Gateau au chocolat", "5a6a03c03e77667641d2d2c3", 200, "Mass")
export const farineTrunk = withDbTrunk("Farine", "5a6a03c03e77667641d2d2c1", 100, "Mass")
export const laitTrunk = withDbTrunk("Lait", "5a6a03c03e77667641d2d2c2", 0.001, "Volu")
export const bleTrunk = withDbTrunk("blé", "5a6a03c03e77667641d2d2c0", 1000, "Mass")
export const pizzaTrunk = withDbTrunk("pizza", "5a6a03c03e77667641d2d2c4", 2, "Nomb")
export const cremeTrunk = withDbTrunk("creme", "5a6a03c03e77667641d2d2c5", 0.0001, "Volu")

export const gateauItem = withIdBqt(gateauTrunk._id, 500)
const pizzaItem = withIdBqt(pizzaTrunk._id, 500)
export const farineItem = withIdBqt(farineTrunk._id, 200)
const laitItem = withIdBqt(laitTrunk._id, 0.02)

export const gateauRoot = {...gateauItem, items: [farineItem, laitItem]}
export const pizzaRoot = {...pizzaItem, items: [farineItem]}
export const farineRoot = {_id: farineTrunk._id, items: [{_id: bleTrunk._id}]}
export const cremeRoot = {_id: cremeTrunk._id, items: [{_id: laitTrunk._id}]}

export const farineBranch = {...farineItem, items: [gateauItem, pizzaItem]}
export const laitBranch = {...laitItem, items: [{_id: cremeTrunk._id}, gateauItem]}
export const bleBranch = {_id: bleTrunk._id, items: [{_id: farineTrunk._id}]}

const gateauFacets = {_id: gateauTrunk._id, items: [withIdBqt(vitCFacetEntry._id, 10), withIdBqt(vitBFacetEntry._id, 0.1)]}
export const bleFacets = {...withIdBqt(bleTrunk._id, 10000), items: [withIdBqt(vitCFacetEntry._id, 6), withIdBqt(vitBFacetEntry._id, 0.15)]}

const gateauImpact = {...withIdBqt(gateauTrunk._id, 500), items: [withIdBqt(vitCImpactEntry._id, 10), withIdBqt(vitBImpactEntry._id, 0.1)]}
export const bleImpacts = {...withIdBqt(bleTrunk._id, 10000), items: [withIdBqt(vitCImpactEntry._id, 6), withIdBqt(vitBImpactEntry._id, 0.15)]}

export const database = {
    [cols.TRUNK]: [gateauTrunk, laitTrunk, farineTrunk, bleTrunk, pizzaTrunk, cremeTrunk],
    [cols.BRANCH]: [laitBranch, farineBranch, bleBranch],
    [cols.ROOT]: [gateauRoot, farineRoot, pizzaRoot, cremeRoot],
    [cols.FACET]: [gateauFacets, bleFacets],
    [cols.IMPACT]: [gateauImpact, bleImpacts]
}