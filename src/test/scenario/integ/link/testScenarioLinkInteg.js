import {run} from "../../../util/testIntegUtil";
import {deleteLink} from "./testDeleteLinkInteg";
import {postLink} from "./testPostLinkInteg";
import {bleLinkDeletionSpec} from "../../../expected/link/testDeleteLinkData";
import {bleToFarineLinkAddSpec} from "../../../expected/link/testPostLinkData";
import {init} from "../../../util/testIntegUtil";

describe('SCENARIO Link', function () {

    beforeEach(init);

    it('suppr puis réajout du blé à la farine',
        run(() => deleteLink(bleLinkDeletionSpec)
            .then(
                () => postLink(bleToFarineLinkAddSpec))
        ));
});

