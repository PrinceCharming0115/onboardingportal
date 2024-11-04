import React, { useState } from 'react';
import { NextPage } from 'next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormInput, Button, FormSelect } from 'components';
import { useSubmitInfo } from 'hooks';
import styles from 'styles/Submit.module.css';
import ProtectedRoute from '../components/ProtectedRoute';
import {
    AdherenceStatusOptions,
    AuthorisationRegistryIDOptions,
    AuthorisationRegistryNameOptions
} from 'const';

const validationSchema = Yup.object({
    party_id: Yup.string().required('Party ID is required'),
    party_name: Yup.string().required('Party Name is required'),
    capability_url: Yup.string().url('Invalid URL'),
    registrar_id: Yup.string().required('Registrar ID is required'),
    status: Yup.string(),
    adherence: Yup.object().shape({
        status: Yup.string().required('Adherence status is required'),
        start_date: Yup.date().required('Start date is required'),
        end_date: Yup.date().required('End date is required'),
    }).required('Adherence is required'),
    authregistries: Yup.array().of(Yup.object().shape({
        authregistery_name: Yup.string().required('Authregistry name is required'),
        authregistery_id: Yup.string().required('Authregistry ID is required'),
        authregistery_url: Yup.string().required('Authregistry URL is required').url('Invalid URL'),
        dataspace_id: Yup.string(),
        dataspace_title: Yup.string(),
    })).required('Authregistries is required'),
    additional_info: Yup.object().shape({
        description: Yup.string(),
        logo: Yup.string(),
        website: Yup.string().url('Invalid URL'),
        company_phone: Yup.string(),
        company_email: Yup.string().email('Invalid email'),
        publicly_publishable: Yup.string(),
        countries_operation: Yup.array().of(Yup.string()),
        sector_industry: Yup.array().of(Yup.string()),
        tags: Yup.string()
    }),
    agreements: Yup.array().of(Yup.object().shape({
        type: Yup.string().required('Agreement type is required'),
        title: Yup.string().required('Agreement title is required'),
        status: Yup.string().required('Agreement status is required'),
        sign_date: Yup.date().required('Sign date is required'),
        expiry_date: Yup.date().required('Expiry date is required'),
        agreement_file: Yup.string().required('Agreement file is required'),
        framework: Yup.string().required('Framework is required'),
        dataspace_id: Yup.string(),
        dataspace_title: Yup.string(),
        complaiancy_verified: Yup.string().required('Compliance verified is required'),
    })),
    spor: Yup.object().shape({
        signed_request: Yup.string().required('Signed request is required'),
    }).required('spor'),
    roles: Yup.array().of(Yup.object().shape({
        role: Yup.string().required('Role is required'),
        start_date: Yup.date().required('Start date is required'),
        end_date: Yup.date().required('End date is required'),
        loa: Yup.string().required('LOA is required'),
        complaiancy_verified: Yup.string().required('Compliance verified is required'),
        legal_adherence: Yup.string().required('Legal adherence is required'),
    }))
});

const Submit: NextPage = () => {
    const { createParty, loading, error, response } = useSubmitInfo();
    const [showAuthRegistryForm, setShowAuthRegistryForm] = useState<boolean>(false);
    const [showAgreementForm, setShowAgreementForm] = useState<boolean>(false);
    const [showCertificateForm, setShowCertificateForm] = useState<boolean>(false);
    const [showRoleForm, setShowRoleForm] = useState<boolean>(false);

    const formik = useFormik({
        initialValues: {
            party_id: '',
            party_name: '',
            capability_url: '',
            registrar_id: '',
            status: '',
            adherence: {
                status: '',
                start_date: '',
                end_date: '',
            },
            authregistries: [{
                authregistery_name: '',
                authregistery_id: '',
                authregistery_url: '',
                dataspace_id: '',
                dataspace_title: '',
            }],
            additional_info: {
                description: '',
                logo: '',
                website: '',
                company_phone: '',
                company_email: '',
                publicly_publishable: 'false',
                tags: ''
            },
            agreements: [{
                type: '',
                title: '',
                status: '',
                sign_date: '',
                expiry_date: '',
                agreement_file: '',
                framework: '',
                dataspace_id: '',
                dataspace_title: '',
                complaiancy_verified: ''
            }],
            spor: {
                signed_request: '',
            },
            roles: [{
                role: '',
                start_date: '',
                end_date: '',
                loa: '',
                complaiancy_verified: '',
                legal_adherence: '',
            }],
        },
        validationSchema,
        onSubmit: (values) => {
            values.agreements.push(values.agreements[0]);
            values.agreements[1].type = "AccessionAgreement"
            console.log('values: ', values);
            createParty(values);
        },
    });

    const handleAddAuthRegistry = () => {
        console.log("add auth clicked")
        setShowAuthRegistryForm(true);
        const newAuthRegistry = {
            authregistery_name: '',
            authregistery_id: '',
            authregistery_url: '',
            dataspace_id: '',
            dataspace_title: '',
        };
        formik.setFieldValue('authregistries', [...formik.values.authregistries, newAuthRegistry]);
    }
    const handleSaveAuthRegistry = () => {
    }
    const handleCancelAuthRegistry = () => {
        setShowAuthRegistryForm(false);
    }

    const handleAddAgreement = () => {
        setShowAgreementForm(true);
    }
    const handleSaveAgreement = () => {
    }
    const handleCancelAgreement = () => {
        setShowAgreementForm(false);
    }

    const handleAddCertificate = () => {
        setShowCertificateForm(true);
    }
    const handleSaveCertificate = () => {        
    }
    const handleCancelCertificate = () => {
        setShowCertificateForm(false);
    }

    const handleAddRole = () => {
        setShowRoleForm(true);
    }
    const handleSaveRole = () => {
    }
    const handleCancelRole = () => {
        setShowRoleForm(false);
    }

    const handleAdherenceStatusChange = (value: string) => {
        formik.setFieldValue('adherence.status', value);
    }

    const handleAuthorisationRegistryIDChange = (value: string) => {
        formik.setFieldValue('authregistries[0].authregistery_id', value);
    }
    const handleAuthorisationRegistryNameChange = (value: string) => {
        formik.setFieldValue('authregistries[0].authregistery_name', value);
    }

    return (
        <ProtectedRoute>
            <div className={styles.container}>
                <h1 className={styles.title}>Submit Party Information</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}> Participant Details </h2>
                        <div className={styles.formGrid}>
                            <FormInput
                                label='Party ID'
                                id='party_id'
                                name='party_id'
                                type='text'
                                placeholder='party id'
                                required
                                value={formik.values.party_id}
                                onChange={formik.handleChange}
                                error={formik.touched.party_id ? formik.errors.party_id : undefined}
                            />
                            <FormInput
                                label='Party Name'
                                id='party_name'
                                name='party_name'
                                placeholder='party name'
                                type='text'
                                required
                                value={formik.values.party_name}
                                onChange={formik.handleChange}
                                error={formik.touched.party_name ? formik.errors.party_name : undefined}
                            />
                            <FormInput
                                label='Start Date'
                                id='adherence.start_date'
                                name='adherence.start_date'
                                type='text'
                                required
                                value={formik.values.adherence.start_date}
                                onChange={formik.handleChange}
                                error={formik.touched.adherence?.start_date ? formik.errors.adherence?.start_date : undefined}
                            />
                            <FormInput
                                label='End Date'
                                id='adherence.end_date'
                                name='adherence.end_date'
                                type='text'
                                required
                                value={formik.values.adherence.end_date}
                                onChange={formik.handleChange}
                                error={formik.touched.adherence?.end_date ? formik.errors.adherence?.end_date : undefined}
                            />
                            <FormSelect
                                label="STATUS"
                                options={AdherenceStatusOptions}
                                value={formik.values.adherence.status}
                                onChange={handleAdherenceStatusChange}
                                required
                            />
                            <FormInput
                                label='Capability URL'
                                id='capability_url'
                                name='capability_url'
                                placeholder='Capabilities URL'
                                type='text'
                                value={formik.values.capability_url}
                                onChange={formik.handleChange}
                                error={formik.touched.capability_url ? formik.errors.capability_url : undefined}
                            />
                            <FormInput
                                label='Registrar ID'
                                id='registrar_id'
                                name='registrar_id'
                                placeholder='Registrar Satellite ID'
                                type='text'
                                required
                                value={formik.values.registrar_id}
                                onChange={formik.handleChange}
                                error={formik.touched.registrar_id ? formik.errors.registrar_id : undefined}
                            />
                            {/* <FormInput
                                label='Status'
                                id='status'
                                name='status'
                                type='text'
                                value={formik.values.status}
                                onChange={formik.handleChange}
                                error={formik.touched.status ? formik.errors.status : undefined}
                            /> */}
                        </div>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.sectionBar}></div>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}> Authorisation Registries </h2>
                            {
                                !showAuthRegistryForm && (
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        icon={<div>+</div>}
                                        onClick={handleAddAuthRegistry}
                                    >
                                        Add Authorisation Registry
                                    </Button>
                                )
                            }
                            {
                                showAuthRegistryForm && (
                                    <div className={styles.buttonGroup}>
                                        <Button
                                            type="button"                                        
                                            variant="secondary"
                                            icon={<div>+</div>}
                                            onClick={handleCancelAuthRegistry}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            icon={<div>+</div>}
                                            onClick={handleAddAuthRegistry}
                                        >
                                            Save
                                        </Button>
                                    </div>
                                )
                            }
                        </div>
                        {
                            showAuthRegistryForm && (
                                <div className={styles.formGrid}>
                                    <FormSelect
                                        label="Authorisation Registry ID"
                                        options={AuthorisationRegistryIDOptions}
                                        value={formik.values.authregistries[0].authregistery_id}
                                        onChange={handleAuthorisationRegistryIDChange}
                                        required
                                    />
                                    <FormSelect
                                        label="Authorisation Registry Name"
                                        options={AuthorisationRegistryNameOptions}
                                        value={formik.values.authregistries[0].authregistery_name}
                                        onChange={handleAuthorisationRegistryNameChange}
                                        required
                                    />                                 
                                    <FormInput
                                        label='Authregistery Registry URL'
                                        id={`authregistries[0].authregistery_url`}
                                        name={`authregistries[0].authregistery_url`}
                                        type='text'
                                        value={""}
                                        required
                                        onChange={formik.handleChange}
                                        error={formik.touched.authregistries?.[0]?.authregistery_url ? formik.errors.authregistries?.[0]?.authregistery_url : undefined}
                                    />
                                    <FormInput
                                        label='Dataspace ID'
                                        id={`authregistries[0].dataspace_id`}
                                        name={`authregistries[0].dataspace_id`}
                                        type='text'
                                        value={""}
                                        onChange={formik.handleChange}
                                        error={formik.touched.authregistries?.[0]?.dataspace_id ? formik.errors.authregistries?.[0]?.dataspace_id : undefined}
                                    />
                                    <FormInput
                                        label='Dataspace Title'
                                        id={`authregistries[0].dataspace_title`}
                                        name={`authregistries[0].dataspace_title`}
                                        type='text'
                                        value={""}
                                        onChange={formik.handleChange}
                                        error={formik.touched.authregistries?.[0]?.dataspace_title ? formik.errors.authregistries?.[0]?.dataspace_title : undefined}
                                    />
                                </div>
                            )
                        }
                    </div>
                    <div className={styles.section}>
                        <div className={styles.sectionBar}></div>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}> Participant Additioanl Details </h2>
                        </div>
                        <div className={styles.formGrid}>
                            <FormInput
                                label='Description'
                                id='additional_info.description'
                                name='additional_info.description'
                                type='text'
                                value={formik.values.additional_info.description}
                                onChange={formik.handleChange}
                                error={formik.touched.additional_info?.description ? formik.errors.additional_info?.description : undefined}
                            />
                            <FormInput
                                label='Website'
                                id='additional_info.website'
                                name='additional_info.website'
                                type='text'
                                value={formik.values.additional_info.website}
                                onChange={formik.handleChange}
                                error={formik.touched.additional_info?.website ? formik.errors.additional_info?.website : undefined}
                            />
                            <FormInput
                                label='Logo URL'
                                id='additional_info.logo'
                                name='additional_info.logo'
                                type='text'
                                value={formik.values.additional_info.logo}
                                onChange={formik.handleChange}
                                error={formik.touched.additional_info?.logo ? formik.errors.additional_info?.logo : undefined}
                            />
                            <FormInput
                                label='Company Email'
                                id='additional_info.company_email'
                                name='additional_info.company_email'
                                type='text'
                                value={formik.values.additional_info.company_email}
                                onChange={formik.handleChange}
                                error={formik.touched.additional_info?.company_email ? formik.errors.additional_info?.company_email : undefined}
                            />
                            <FormInput
                                label='Company Phone'
                                id='additional_info.company_phone'
                                name='additional_info.company_phone'
                                type='text'
                                value={formik.values.additional_info.company_phone}
                                onChange={formik.handleChange}
                                error={formik.touched.additional_info?.company_phone ? formik.errors.additional_info?.company_phone : undefined}
                            />
                            <FormInput
                                label='Tags'
                                id='additional_info.tags'
                                name='additional_info.tags'
                                type='text'
                                value={formik.values.additional_info.tags}
                                onChange={formik.handleChange}
                                error={formik.touched.additional_info?.tags ? formik.errors.additional_info?.tags : undefined}
                            />
                            <FormInput
                                label='Publicly Publishable'
                                id='additional_info.publicly_publishable'
                                name='additional_info.publicly_publishable'
                                type='text'
                                value={formik.values.additional_info.publicly_publishable}
                                onChange={formik.handleChange}
                                error={formik.touched.additional_info?.publicly_publishable ? formik.errors.additional_info?.publicly_publishable : undefined}
                            />
                        </div>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.sectionBar}></div>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}> Agreements (Minimum 2) </h2>
                            {
                                !showAgreementForm && (
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        icon={<div>+</div>}
                                        className={styles.minButton}
                                        onClick={handleAddAgreement}
                                    >
                                        Add Agreements
                                    </Button>
                                )
                            }
                            {
                                showAgreementForm && (
                                    <div className={styles.buttonGroup}>
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            icon={<div>+</div>}
                                            onClick={handleCancelAgreement}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            icon={<div>+</div>}
                                            onClick={handleSaveAgreement}
                                        >
                                            Save
                                        </Button>
                                    </div>
                                )
                            }                            
                        </div>
                        {
                            showAgreementForm && (
                                <div className={styles.formGrid}>
                                    <FormInput
                                        label='Type'
                                        id={`agreements[0].type`}
                                        name={`agreements[0].type`}
                                        type='text'
                                        value={""}
                                        required
                                        onChange={formik.handleChange}
                                        error={formik.touched.agreements?.[0]?.type ? formik.errors.agreements?.[0]?.type : undefined}
                                    />
                                    <FormInput
                                        label='Title'
                                        id={`agreements[0].title`}
                                        name={`agreements[0].title`}
                                        type='text'
                                        value={""}
                                        required
                                        onChange={formik.handleChange}
                                        error={formik.touched.agreements?.[0]?.title ? formik.errors.agreements?.[0]?.title : undefined}
                                    />
                                    <FormInput
                                        label='Status'
                                        id={`agreements[0].status`}
                                        name={`agreements[0].status`}
                                        type='text'
                                        value={""}
                                        required
                                        onChange={formik.handleChange}
                                        error={formik.touched.agreements?.[0]?.status ? formik.errors.agreements?.[0]?.status : undefined}
                                    />
                                    <FormInput
                                        label='Date of Signing'
                                        id={`agreements[0].sign_date`}
                                        name={`agreements[0].sign_date`}
                                        type='text'
                                        value={""}
                                        required
                                        onChange={formik.handleChange}
                                        error={formik.touched.agreements?.[0]?.sign_date ? formik.errors.agreements?.[0]?.sign_date : undefined}
                                    />
                                    <FormInput
                                        label='Date of Expiry'
                                        id={`agreements[0].expiry_date`}
                                        name={`agreements[0].expiry_date`}
                                        type='text'
                                        value={""}
                                        required
                                        onChange={formik.handleChange}
                                        error={formik.touched.agreements?.[0]?.expiry_date ? formik.errors.agreements?.[0]?.expiry_date : undefined}
                                    />
                                    <FormInput
                                        label='Framework'
                                        id={`agreements[0].framework`}
                                        name={`agreements[0].framework`}
                                        type='text'
                                        value={""}
                                        required
                                        onChange={formik.handleChange}
                                        error={formik.touched.agreements?.[0]?.framework ? formik.errors.agreements?.[0]?.framework : undefined}
                                    />
                                    <FormInput
                                        label='Dataspace ID'
                                        id={`agreements[0].dataspace_id`}
                                        name={`agreements[0].dataspace_id`}
                                        type='text'
                                        value={""}
                                        onChange={formik.handleChange}
                                        error={formik.touched.agreements?.[0]?.dataspace_id ? formik.errors.agreements?.[0]?.dataspace_id : undefined}
                                    />
                                    <FormInput
                                        label='Dataspace Title'
                                        id={`agreements[0].dataspace_title`}
                                        name={`agreements[0].dataspace_title`}
                                        type='text'
                                        value={""}
                                        onChange={formik.handleChange}
                                        error={formik.touched.agreements?.[0]?.dataspace_title ? formik.errors.agreements?.[0]?.dataspace_title : undefined}
                                    />
                                    <FormInput
                                        label='Contract File'
                                        id={`agreements[0].agreement_file`}
                                        name={`agreements[0].agreement_file`}
                                        type='text'
                                        value={""}
                                        onChange={formik.handleChange}
                                        error={formik.touched.agreements?.[0]?.agreement_file ? formik.errors.agreements?.[0]?.agreement_file : undefined}
                                    />
                                    <FormInput
                                        label='Complaiancy Verified'
                                        id={`agreements[0].complaiancy_verified`}
                                        name={`agreements[0].complaiancy_verified`}
                                        type='text'
                                        value={""}
                                        required
                                        onChange={formik.handleChange}
                                        error={formik.touched.agreements?.[0]?.complaiancy_verified ? formik.errors.agreements?.[0]?.complaiancy_verified : undefined}
                                    />
                                    {/* <FormCheckbox
                                        label='Complaiancy Verified'
                                        name={`agreements[0].complaiancy_verified`}
                                        checked={agreement.complaiancy_verified}
                                        onChange={formik.handleChange}
                                        error={formik.touched.agreements?.[0]?.complaiancy_verified ? formik.errors.agreements?.[0]?.complaiancy_verified : undefined}
                                    /> */}
                                </div>
                            )
                        }
                    </div>
                    <div className={styles.section}>
                        <div className={styles.sectionBar}></div>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}> Roles (Minimum 1) </h2>
                            {
                                !showRoleForm && (
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        icon={<div>+</div>}
                                        className={styles.minButton}
                                        onClick={handleAddRole}
                                    >
                                        Add Role
                                    </Button>
                                )
                            }
                            {
                                showRoleForm && (
                                    <div className={styles.buttonGroup}>
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            icon={<div>+</div>}
                                            onClick={handleCancelRole}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            icon={<div>+</div>}
                                            onClick={handleSaveRole}
                                        >
                                            Save
                                        </Button>
                                    </div>
                                )
                            }
                        </div>
                        {
                            showRoleForm && (
                                <div className={styles.formGrid}>
                                    <FormInput
                                        label='Role'
                                        id={`roles[0].role`}
                                        name={`roles[0].role`}
                                        type='text'
                                        value={""}
                                        onChange={formik.handleChange}
                                        error={formik.touched.roles?.[0]?.role ? formik.errors.roles?.[0]?.role : undefined}
                                    />
                                    <FormInput
                                        label='Start Date'
                                        id={`roles[0].start_date`}
                                        name={`roles[0].start_date`}
                                        type='text'
                                        value={""}
                                        onChange={formik.handleChange}
                                        error={formik.touched.roles?.[0]?.start_date ? formik.errors.roles?.[0]?.start_date : undefined}
                                    />
                                    <FormInput
                                        label='End Date'
                                        id={`roles[0].end_date`}
                                        name={`roles[0].end_date`}
                                        type='text'
                                        value={""}
                                        onChange={formik.handleChange}
                                        error={formik.touched.roles?.[0]?.end_date ? formik.errors.roles?.[0]?.end_date : undefined}
                                    />
                                    <FormInput
                                        label='Loa'
                                        id={`roles[0].loa`}
                                        name={`roles[0].loa`}
                                        type='text'
                                        value={""}
                                        onChange={formik.handleChange}
                                        error={formik.touched.roles?.[0]?.loa ? formik.errors.roles?.[0]?.loa : undefined}
                                    />
                                    <FormInput
                                        label='Complaiancy Verified'
                                        id={`roles[0].complaiancy_verified`}
                                        name={`roles[0].complaiancy_verified`}
                                        type='text'
                                        value={""}
                                        onChange={formik.handleChange}
                                        error={formik.touched.roles?.[0]?.complaiancy_verified ? formik.errors.roles?.[0]?.complaiancy_verified : undefined}
                                    />
                                    <FormInput
                                        label='Legal Adherence'
                                        id={`roles[0].legal_adherence`}
                                        name={`roles[0].legal_adherence`}
                                        type='text'
                                        value={""}
                                        onChange={formik.handleChange}
                                        error={formik.touched.roles?.[0]?.legal_adherence ? formik.errors.roles?.[0]?.legal_adherence : undefined}
                                    />
                                </div>
                            )
                        }
                    </div>
                    <h2>Spor</h2>
                    <FormInput
                        label='Signed Request'
                        id='spor.signed_request'
                        name='spor.signed_request'
                        type='text'
                        value={formik.values.spor.signed_request}
                        onChange={formik.handleChange}
                        error={formik.touched.spor?.signed_request ? formik.touched.spor?.signed_request : undefined}
                    />
                    <br />
                    <br />
                    <br />
                    <div className={styles.buttonGroup}>
                        <Button
                            type="button"
                            variant="secondary"
                            icon={<div>+</div>}
                            onClick={() => {}}
                        >
                            Back
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            icon={<div>+</div>}
                            onClick={() => {}}
                        >
                            Create
                        </Button>
                    </div>
                </form>
            </div>
        </ProtectedRoute>
    );
};

export default Submit;