$('#editProjectModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var name = button.data('name');
    var repo = button.data('repo');
    var path = button.data('path');
    var deployCommand = button.data('deploy');
    var keepUpToDate = button.data('keep-updated');
    
    var modal = $(this);
    modal.find('.modal-body #edit-project-name').val(name);
    modal.find('.modal-body #edit-project-url').val(repo);
    modal.find('.modal-body #edit-project-path').val(path);
    modal.find('.modal-body #edit-project-deployCommand').val(deployCommand);
    modal.find('.modal-body #edit-project-keepUpdated').prop('checked', keepUpToDate);
});

$('#deleteProjectModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var name = button.data('name');

    var modal = $(this);
    modal.find('.modal-body #delete-project-name').val(name);
});