(function($) {

  // Here you can customize the social provider.
  var socialLinks = {
    facebook: 'Facebook',
    twitter: 'Twitter',
    gplus: 'Google+'
  };

  // Add button to CKEditor.
  CKEDITOR.plugins.add('socialLinks', {
    init: function(editor) {
      editor.addCommand('social_links', new CKEDITOR.dialogCommand('social_links'));
      editor.ui.addButton('sociallinks', {
        label: 'Social links',
        command: 'social_links',
        icon: this.path + 'icon.png'
      });
    }
  });

  // Contains dialog functionality.
  CKEDITOR.dialog.add('social_links', function(editor) {
    var dialogDefinition = {
      title : 'Social links',
      minWidth : 390,
      minHeight : 130,
      contents : [{
        id: 'tab',
        label: 'Label',
        title: 'Title',
        expand: true,
        padding: 0,
        elements: [
        {
          type : 'html',
          html : '<p>Enter the URLs and it will be displayed as linked</p>'
        }]
      }],
      buttons: [CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton],
      onOk: function() {
        var output = '';
        var emptyLinks = true;

        var links = {};

        for (var i in socialLinks) {
          links[i] = this.getValueOf('tab', i);
        }

        for (var i in links) {
          if (emptyLinks) {
            emptyLinks = false;
          }

          if (links[i]) {
            output += '<li><a href="' + links[i] + '" class="' + i + '">' + socialLinks[i] + '</a></li>';
          }

        }

        if (!emptyLinks) {
          output = '<ul class="social-icons">' + output + '</ul>';
          editor.insertHtml(output);
        }
      }
    };

    for (var i in socialLinks) {
      dialogDefinition.contents[0].elements.push({
        label: socialLinks[i],
        type: 'text',
        id: i
      });
    }

    return dialogDefinition;
  });

})(jQuery);
