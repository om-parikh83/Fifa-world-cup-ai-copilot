from django.contrib import admin
from .models import VolunteerTask, VolunteerAssignment


class VolunteerAssignmentInline(admin.TabularInline):
    model = VolunteerAssignment
    extra = 0
    readonly_fields = ('check_in_time', 'check_out_time')


@admin.register(VolunteerTask)
class VolunteerTaskAdmin(admin.ModelAdmin):
    list_display = ('name', 'area', 'shift_start', 'shift_end', 'volunteers_required', 'priority', 'created_at')
    list_filter = ('priority', 'area', 'created_at')
    search_fields = ('name', 'area', 'description')
    ordering = ('priority', 'shift_start')
    inlines = [VolunteerAssignmentInline]


@admin.register(VolunteerAssignment)
class VolunteerAssignmentAdmin(admin.ModelAdmin):
    list_display = ('volunteer', 'task', 'status', 'check_in_time', 'check_out_time')
    list_filter = ('status', 'task__priority')
    search_fields = ('volunteer__username', 'volunteer__email', 'task__name', 'notes')
    ordering = ('-task__created_at',)
    readonly_fields = ('check_in_time', 'check_out_time')
