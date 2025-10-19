import { gql } from 'apollo-angular';

export const GET_FRAME_DATA_CHARACTERS = gql`
  {
    data: characters {
      name
      normalizedName
      fightCoreId
      characterStatistics {
        id
        initialDash
        dashFrames
        waveDashLength
        weight
        gravity
        walkSpeed
        runSpeed
        waveDashLengthRank
        plaIntangibilityFrames
        jumpSquat
        canWallJump
        notes
      }
      id
    }
  }
`;

export const GET_CHARACTER_DATA = gql`
  query GetCharacter($fightCoreId: Long) {
    data: characters(where: { fightCoreId: { eq: $fightCoreId } }) {
      name
      normalizedName
      fightCoreId
      characterStatistics {
        id
        initialDash
        dashFrames
        waveDashLength
        weight
        gravity
        walkSpeed
        runSpeed
        waveDashLengthRank
        plaIntangibilityFrames
        jumpSquat
        canWallJump
        notes
      }
      id
      moves {
        name
        normalizedName
        start
        end
        type
        notes
        percent
        source
        gifUrl
        webmUrl
        pngUrl
        isInterpolated
        id
        landLag
        lCanceledLandLag
        landingFallSpecialLag
        totalFrames
        iasa
        autoCancelBefore
        autoCancelAfter
        alternativeAnimations {
          description
          gifUrl
          webmUrl
          pngUrl
          id
        }
        hits {
          start
          end
          name
          hitboxes {
            name
            hitlagDefenderCrouched
            shieldstun
            yoshiArmorBreakPercentage
            isWeightIndependent
            id
            damage
            angle
            knockbackGrowth
            setKnockback
            baseKnockback
            effect
            hitlagAttacker
            hitlagDefender
            hitlagAttackerCrouched
          }
        }
      }
    }
  }
`;
