/**
 * This file contains all Drupal behaviours of the Apia theme.
 *
 * Created by ralph on 05.01.14.
 */

(function ($) {

    /**
     * Set a class defining the device, e.g. mobile-device or desktop.
     */
    Drupal.behaviors.setMobileClass = {
      attach: function (context) {
        if (isMobile.any) {
          $('body').addClass('mobile-device');
        }
        else {
          $('body').addClass('desktop');
        }
      }
    };

    /**
     * Allows full size clickable items.
     */
    Drupal.behaviors.fullSizeClickableItems = {
        attach: function () {
            var $clickableItems = $('.node-link-item.node-teaser .field-group-div')
                .add('.node-team-member.node-teaser .field-group-div');

            $clickableItems.once('click', function () {
                $clickableItems.on('click', function () {
                    window.location = $(this).find("a:first").attr("href");
                    return false;
                });
            });
        }
    };

    /**
     * Swaps images from black/white to colored on mouse hover.
     */
    Drupal.behaviors.hoverImageSwap = {
        attach: function () {
            $('.node-project.node-teaser .field-name-field-images a img').hover(
                function () {
                    // mouse enter
                    src = $(this).attr('src');
                    $(this).attr('src', src.replace('teaser_bw', 'teaser_normal'));
                },
                function () {
                    // mouse leave
                    src = $(this).attr('src');
                    $(this).attr('src', src.replace('teaser_normal', 'teaser_bw'));
                }
            );
        }
    }

    Drupal.behaviors.hideLabelOnFilledInput = {
        attach: function () {
            var $textFields = $('#block-mailchimp-signup-newsletter').find('.mailchimp-newsletter-mergefields > .form-type-textfield input');

            // empty all fields on reload
            $textFields.val('');

            $textFields.on('blur', function () {
                if ($(this).val()) {
                    $(this).siblings('label').hide();
                }
            });
        }
    }

    /**
     * Guarantees, that only one button is clicked of all sparse sorting buttons on front page.
     */
    Drupal.behaviors.exclusiveSparseSortingButtons = {
        attach: function () {
            var $countryButtonGroup = $('#sort-buttons-6-block-3'),
                $topicButtonGroup = $('#sort-buttons-6-block-2'),
                $countryResetButton = $countryButtonGroup.find('.reset'),
                $topicResetButton = $topicButtonGroup.find('.reset');

            $countryButtonGroup.on('click', '.button', function () {
                $topicButtonGroup.find('.button.selected').removeClass('selected');
                $topicResetButton.addClass('selected');
            });
            $topicButtonGroup.on('click', '.button', function () {
                $countryButtonGroup.find('.button.selected').removeClass('selected');
                $countryResetButton.addClass('selected');
            });
        }
    }

    /**
     * Open file links in its own tab. The file field doesn't implement this behaviour right away.
     */
    Drupal.behaviors.openDocumentsInTab = {
        attach: function () {
            $(".field-name-field-documents").find(".field-item a").attr('target', '_blank');
        }
    }



})(jQuery);
