var state = {
    items: []
};

var itemTemplate = (
	'<li>' +
    '<span class="shopping-item js-shopping-item"></span>' +
    '<div class="shopping-item-controls">' +
      '<button class="js-shopping-item-toggle">' +
        '<span class="button-label">check</span>' +
      '</button>' +
      '<button class="js-shopping-item-delete">' +
        '<span class="button-label">delete</span>' +
      '</button>' +
    '</div>' +
  '</li>'
);


function addItem(item) {
	state.items.push({
		displayName: item,
		checked: false
	});
};

function toggleItemStatus(index) {
    state.items[index].checked = !state.items[index].checked;
}

function renderList() {
	var itemsHtml = [];
	for (var i = 0; i < state.items.length; i++) {
		itemsHtml.push(renderItem(state.items[i], i));
	}
	$('.shopping-list').html(itemsHtml);
}

function renderItem(stateItem, index) {
	var item = $(itemTemplate);
	var displayName = stateItem.displayName;
	item.find('.shopping-item').text(displayName);
	item.attr('id', index);
  // check if an item is checked, in which case add class to show visual check
    if (state.items[index].checked == true) {
        item.addClass('shopping-item__checked');
  return item;
}

$(function() {
  registerItemCheckHandler();
	$('#js-shopping-list-form').submit(function(event) {
    	event.preventDefault();
      registerItemCheckHandler();
    	addItem($('#shopping-list-entry').val());
    	renderList();
	});
});

// function to register a click handler function for all elements with a 'js-shopping-item-toggle'
// class. Everytime an element is added to the DOM, we must re-register.
// The problem initially was that when the code below ran, no elements were in the DOM. We need to re-run
// this code everytime we add an element to the DOM.
function registerItemCheckHandler() {
   $('ul').on('click', '.js-shopping-item-toggle', function(event) {
        // clicked list items
        var li = $(this).closest('li');
        // add class to make item visually checked
      li.addClass('shopping-item__checked');
        // logic to update our in memory state to reflect that item has been checked
        var liId = li.attr('id');
        toggleItemStatus(liId);
  });

}

function registerItemDelete() {
  $('ul').on('click', '.js-shopping-item-delete', function(event)){
    var liDel = $(this).closest('li');
    li.remove('li');
  }
}
