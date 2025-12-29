'use client'

import { useFormContext, Controller } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { GHANA_REGIONS, RELATIONSHIP_OPTIONS } from '@/lib/constants/grade-levels'
import type { ApplicationFormData } from '@/types/application'

export function StepParentInfo() {
  const { register, formState: { errors }, watch, control, setValue } = useFormContext<ApplicationFormData>()
  const hasSecondParent = watch('hasSecondParent')

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Parent/Guardian Information</h2>
        <p className="text-neutral-600">Please provide the primary parent or guardian's information</p>
      </div>

      {/* Primary Parent Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-neutral-900">Primary Parent/Guardian</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="parent_full_name">Full Name *</Label>
            <Input
              id="parent_full_name"
              {...register('parent_full_name')}
              placeholder="Enter full name"
              className={errors.parent_full_name ? 'border-red-500' : ''}
            />
            {errors.parent_full_name && (
              <p className="text-sm text-red-500">{errors.parent_full_name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="parent_email">Email Address *</Label>
            <Input
              id="parent_email"
              type="email"
              {...register('parent_email')}
              placeholder="email@example.com"
              className={errors.parent_email ? 'border-red-500' : ''}
            />
            {errors.parent_email && (
              <p className="text-sm text-red-500">{errors.parent_email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="parent_phone">Phone Number *</Label>
            <Input
              id="parent_phone"
              {...register('parent_phone')}
              placeholder="+233XXXXXXXXX"
              className={errors.parent_phone ? 'border-red-500' : ''}
            />
            {errors.parent_phone && (
              <p className="text-sm text-red-500">{errors.parent_phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="parent_phone_alt">Alternative Phone</Label>
            <Input
              id="parent_phone_alt"
              {...register('parent_phone_alt')}
              placeholder="+233XXXXXXXXX (optional)"
            />
            {errors.parent_phone_alt && (
              <p className="text-sm text-red-500">{errors.parent_phone_alt.message}</p>
            )}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="parent_address">Home Address *</Label>
            <Input
              id="parent_address"
              {...register('parent_address')}
              placeholder="Street address"
              className={errors.parent_address ? 'border-red-500' : ''}
            />
            {errors.parent_address && (
              <p className="text-sm text-red-500">{errors.parent_address.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="parent_city">City *</Label>
            <Input
              id="parent_city"
              {...register('parent_city')}
              placeholder="City"
              className={errors.parent_city ? 'border-red-500' : ''}
            />
            {errors.parent_city && (
              <p className="text-sm text-red-500">{errors.parent_city.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="parent_region">Region *</Label>
            <Controller
              name="parent_region"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className={errors.parent_region ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    {GHANA_REGIONS.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.parent_region && (
              <p className="text-sm text-red-500">{errors.parent_region.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="parent_occupation">Occupation *</Label>
            <Input
              id="parent_occupation"
              {...register('parent_occupation')}
              placeholder="Occupation"
              className={errors.parent_occupation ? 'border-red-500' : ''}
            />
            {errors.parent_occupation && (
              <p className="text-sm text-red-500">{errors.parent_occupation.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="parent_employer">Employer</Label>
            <Input
              id="parent_employer"
              {...register('parent_employer')}
              placeholder="Employer (optional)"
            />
          </div>
        </div>
      </div>

      {/* Second Parent Toggle */}
      <div className="flex items-center space-x-2 pt-4 border-t">
        <Checkbox
          id="hasSecondParent"
          checked={hasSecondParent}
          onCheckedChange={(checked) => setValue('hasSecondParent', !!checked)}
        />
        <Label htmlFor="hasSecondParent" className="cursor-pointer">
          Add second parent/guardian information
        </Label>
      </div>

      {/* Second Parent Information */}
      {hasSecondParent && (
        <div className="space-y-6 pt-4">
          <h3 className="text-lg font-semibold text-neutral-900">Second Parent/Guardian</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="second_parent_full_name">Full Name</Label>
              <Input
                id="second_parent_full_name"
                {...register('second_parent_full_name')}
                placeholder="Enter full name"
              />
              {errors.second_parent_full_name && (
                <p className="text-sm text-red-500">{errors.second_parent_full_name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="second_parent_email">Email Address</Label>
              <Input
                id="second_parent_email"
                type="email"
                {...register('second_parent_email')}
                placeholder="email@example.com"
              />
              {errors.second_parent_email && (
                <p className="text-sm text-red-500">{errors.second_parent_email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="second_parent_phone">Phone Number</Label>
              <Input
                id="second_parent_phone"
                {...register('second_parent_phone')}
                placeholder="+233XXXXXXXXX"
              />
              {errors.second_parent_phone && (
                <p className="text-sm text-red-500">{errors.second_parent_phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="second_parent_relationship">Relationship to Child</Label>
              <Controller
                name="second_parent_relationship"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      {RELATIONSHIP_OPTIONS.map((relationship) => (
                        <SelectItem key={relationship} value={relationship.toLowerCase()}>
                          {relationship}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.second_parent_relationship && (
                <p className="text-sm text-red-500">{errors.second_parent_relationship.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="second_parent_occupation">Occupation</Label>
              <Input
                id="second_parent_occupation"
                {...register('second_parent_occupation')}
                placeholder="Occupation"
              />
              {errors.second_parent_occupation && (
                <p className="text-sm text-red-500">{errors.second_parent_occupation.message}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
