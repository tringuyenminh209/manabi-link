'use client';

import React, { useState } from 'react';
import {
    Settings,
    DollarSign,
    Shield,
    Mail,
    Puzzle,
    Upload,
    Power,
    TestTube2,
    Lock,
    Key,
    Save,
    AlertTriangle,
    CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Toggle } from '@/components/ui/Toggle';

type AdminSettingsTab = 'general' | 'finance' | 'moderation' | 'security' | 'integrations';

// --- Main Component ---
const AdminSettingsPage = () => {
    const [activeTab, setActiveTab] = useState<AdminSettingsTab>('general');
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const tabs = [
        { id: 'general', label: 'Chung', icon: Settings },
        { id: 'finance', label: 'Tài chính', icon: DollarSign },
        { id: 'moderation', label: 'Kiểm duyệt', icon: Shield },
        { id: 'security', label: 'Bảo mật', icon: Lock },
        { id: 'integrations', label: 'API & Tích hợp', icon: Key },
    ];

    const handleSave = async () => {
        setIsSaving(true);
        setSaveStatus('idle');

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setIsSaving(false);
        setSaveStatus('success');

        setTimeout(() => setSaveStatus('idle'), 3000);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'general':
                return (
                    <GeneralSettings onSave={handleSave} isSaving={isSaving} data-oid="33y2dv9" />
                );

            case 'finance':
                return (
                    <FinanceSettings onSave={handleSave} isSaving={isSaving} data-oid="-h_o:-a" />
                );

            case 'moderation':
                return (
                    <ModerationSettings
                        onSave={handleSave}
                        isSaving={isSaving}
                        data-oid="0rfxh45"
                    />
                );

            case 'security':
                return (
                    <SecuritySettings onSave={handleSave} isSaving={isSaving} data-oid="5bmga:q" />
                );

            case 'integrations':
                return (
                    <IntegrationsSettings
                        onSave={handleSave}
                        isSaving={isSaving}
                        data-oid="ml58s21"
                    />
                );

            default:
                return (
                    <GeneralSettings onSave={handleSave} isSaving={isSaving} data-oid="yvgmqh9" />
                );
        }
    };

    return (
        <div className="manabi-section" data-oid="we7ft-n">
            {/* Header */}
            <div data-oid="mfhuelb">
                <h1 className="manabi-heading-1" data-oid="bupapm:">
                    Cài đặt Hệ thống
                </h1>
                <p className="manabi-text-muted mt-1" data-oid="62pxh0d">
                    Quản lý các cấu hình cốt lõi của nền tảng Manabi Link.
                </p>
            </div>

            {/* Save Status */}
            {saveStatus === 'success' && (
                <div
                    className="flex items-center gap-2 p-4 bg-success-green/10 border border-success-green/20 rounded-lg text-success-green"
                    data-oid="azrihcb"
                >
                    <CheckCircle className="w-5 h-5" data-oid="o9bzl07" />
                    <span data-oid="2sjd2sa">Cài đặt đã được lưu thành công!</span>
                </div>
            )}

            {/* Tab Navigation */}
            <div className="flex border-b border-light-border" data-oid="w9v55iv">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as AdminSettingsTab)}
                        className={`manabi-tab ${
                            activeTab === tab.id ? 'manabi-tab-active' : 'manabi-tab-inactive'
                        }`}
                        data-oid="88xfx27"
                    >
                        <tab.icon className="w-5 h-5" data-oid="dmr2isq" />
                        <span data-oid="bc5irc1">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="mt-6" data-oid="j7cycxc">
                {renderContent()}
            </div>
        </div>
    );
};

// --- Child Components for each Tab ---

const SettingsCard = ({
    title,
    description,
    children,
    footer,
    warning,
}: {
    title: string;
    description: string;
    children: React.ReactNode;
    footer: React.ReactNode;
    warning?: string;
}) => (
    <Card data-oid="328h4s:">
        <CardHeader data-oid="v:3zqgh">
            <h3 className="manabi-heading-3" data-oid="ttxzet6">
                {title}
            </h3>
            <p className="manabi-text-muted mt-1" data-oid="45mz5ib">
                {description}
            </p>
            {warning && (
                <div
                    className="flex items-center gap-2 mt-3 p-3 bg-warning-red/10 border border-warning-red/20 rounded-lg text-warning-red"
                    data-oid="6j3t7eh"
                >
                    <AlertTriangle className="w-4 h-4" data-oid="s7:2u2h" />
                    <span className="text-sm" data-oid="stikbh3">
                        {warning}
                    </span>
                </div>
            )}
        </CardHeader>
        <CardBody data-oid="2m7sa9q">{children}</CardBody>
        <CardFooter data-oid=".7mpslh">{footer}</CardFooter>
    </Card>
);

const FormRow = ({
    label,
    description,
    children,
}: {
    label: string;
    description: string;
    children: React.ReactNode;
}) => (
    <div className="manabi-form-row" data-oid="s5_amdg">
        <div className="md:col-span-1" data-oid="fshh-n1">
            <label className="manabi-form-label" data-oid="jyu3o6u">
                {label}
            </label>
            <p className="manabi-form-description" data-oid="iv3sqns">
                {description}
            </p>
        </div>
        <div className="manabi-form-field" data-oid="1_c2enz">
            {children}
        </div>
    </div>
);

const GeneralSettings = ({ onSave, isSaving }: { onSave: () => void; isSaving: boolean }) => {
    const [websiteName, setWebsiteName] = useState('Manabi Link');
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [timezone, setTimezone] = useState('Asia/Ho_Chi_Minh');

    const timezoneOptions = [
        { value: 'Asia/Ho_Chi_Minh', label: 'Asia/Ho_Chi_Minh (UTC+7)' },
        { value: 'Asia/Tokyo', label: 'Asia/Tokyo (UTC+9)' },
        { value: 'UTC', label: 'UTC (UTC+0)' },
        { value: 'America/New_York', label: 'America/New_York (UTC-5)' },
    ];

    return (
        <SettingsCard
            title="Cài đặt chung"
            description="Quản lý thông tin cơ bản và trạng thái hoạt động của website."
            footer={
                <Button
                    variant="primary"
                    size="sm"
                    onClick={onSave}
                    loading={isSaving}
                    leftIcon={<Save className="w-4 h-4" data-oid="0ar3kyx" />}
                    data-oid="udb9f4e"
                >
                    Lưu thay đổi
                </Button>
            }
            data-oid="fmwx-v5"
        >
            <FormRow
                label="Tên website"
                description="Tên sẽ được hiển thị trên trang chủ và tiêu đề trình duyệt."
                data-oid="n8-l:k8"
            >
                <Input
                    value={websiteName}
                    onChange={(e) => setWebsiteName(e.target.value)}
                    placeholder="Nhập tên website"
                    data-oid="ck3i-7j"
                />
            </FormRow>

            <FormRow
                label="Múi giờ"
                description="Múi giờ mặc định cho hệ thống."
                data-oid="jhy-cbv"
            >
                <Select
                    value={timezone}
                    onChange={setTimezone}
                    options={timezoneOptions}
                    placeholder="Chọn múi giờ"
                    data-oid="pg926sz"
                />
            </FormRow>

            <FormRow
                label="Logo website"
                description="Tải lên logo của bạn (định dạng .png, .svg)."
                data-oid="_54h-1y"
            >
                <div className="flex items-center gap-4" data-oid="37dae5p">
                    <div
                        className="w-16 h-16 bg-light-border rounded-md flex items-center justify-center"
                        data-oid="8q_93s1"
                    >
                        <span className="text-xl font-bold text-wisdom-blue" data-oid="r0e7qe3">
                            ML
                        </span>
                    </div>
                    <label
                        htmlFor="logo-upload"
                        className="manabi-btn-secondary text-sm px-4 py-2 cursor-pointer flex items-center gap-2"
                        data-oid="d.tnxgj"
                    >
                        <Upload className="w-4 h-4" data-oid="-iie1cw" /> Tải lên
                    </label>
                    <input id="logo-upload" type="file" className="hidden" data-oid="yycznmt" />
                </div>
            </FormRow>

            <FormRow
                label="Chế độ bảo trì"
                description="Khi bật, chỉ quản trị viên có thể truy cập website."
                data-oid="_zcbnar"
            >
                <Toggle
                    checked={maintenanceMode}
                    onChange={setMaintenanceMode}
                    label="Kích hoạt chế độ bảo trì"
                    data-oid="vzrn9np"
                />
            </FormRow>
        </SettingsCard>
    );
};

const FinanceSettings = ({ onSave, isSaving }: { onSave: () => void; isSaving: boolean }) => (
    <SettingsCard
        title="Cài đặt tài chính"
        description="Quản lý phí hoa hồng và cổng thanh toán."
        footer={
            <Button
                variant="primary"
                size="sm"
                onClick={onSave}
                loading={isSaving}
                data-oid="epjrg5u"
            >
                Lưu thay đổi
            </Button>
        }
        data-oid="4cim7_e"
    >
        <FormRow
            label="Phí hoa hồng"
            description="Phần trăm phí nền tảng sẽ thu trên mỗi giao dịch thành công."
            data-oid="4ldynee"
        >
            <div className="flex items-center gap-2" data-oid="xaore30">
                <input
                    type="number"
                    className="manabi-input w-32"
                    defaultValue="10"
                    min="0"
                    max="50"
                    data-oid="1-buq:s"
                />

                <span className="text-charcoal-gray" data-oid="vyjw0zm">
                    %
                </span>
            </div>
        </FormRow>
        <FormRow
            label="Cổng thanh toán"
            description="Nhập API keys để kích hoạt thanh toán qua thẻ tín dụng (ví dụ: Stripe)."
            data-oid="7cp_7bi"
        >
            <div className="space-y-4" data-oid="6w0yda3">
                <div data-oid="7le8l__">
                    <label
                        className="block text-sm font-medium text-charcoal-gray mb-2"
                        data-oid="z9.mzop"
                    >
                        Stripe Public Key
                    </label>
                    <input
                        type="text"
                        className="manabi-input"
                        placeholder="pk_test_..."
                        data-oid="ico99ft"
                    />
                </div>
                <div data-oid="2023h.6">
                    <label
                        className="block text-sm font-medium text-charcoal-gray mb-2"
                        data-oid="0i6a33y"
                    >
                        Stripe Secret Key
                    </label>
                    <input
                        type="password"
                        className="manabi-input"
                        placeholder="sk_test_..."
                        data-oid="t72ekxh"
                    />
                </div>
            </div>
        </FormRow>
    </SettingsCard>
);

const ModerationSettings = ({ onSave, isSaving }: { onSave: () => void; isSaving: boolean }) => (
    <SettingsCard
        title="Cài đặt kiểm duyệt"
        description="Quản lý quy trình kiểm duyệt nội dung và người dùng."
        footer={
            <Button
                variant="primary"
                size="sm"
                onClick={onSave}
                loading={isSaving}
                data-oid="yblch3a"
            >
                Lưu thay đổi
            </Button>
        }
        data-oid="ntderr2"
    >
        <FormRow
            label="Kiểm duyệt khóa học"
            description="Yêu cầu phê duyệt trước khi khóa học được xuất bản."
            data-oid="6hedl0d"
        >
            <div
                className="flex items-center justify-between p-4 bg-white border border-light-border rounded-lg"
                data-oid="kp0wb8m"
            >
                <p data-oid="zv03:st">Bật kiểm duyệt tự động</p>
                <label data-oid="f:sasci">
                    <input type="checkbox" data-oid="0b3rgiw" />
                    <div className="manabi-toggle-slider" data-oid="k76n6kq"></div>
                </label>
            </div>
        </FormRow>
        <FormRow
            label="Từ khóa cấm"
            description="Danh sách từ khóa bị cấm trong tiêu đề và mô tả khóa học."
            data-oid="z5y9g1p"
        >
            <textarea
                className="manabi-textarea"
                rows={4}
                placeholder="Nhập từ khóa cấm, mỗi từ một dòng..."
                data-oid="imz71p3"
            />
        </FormRow>
    </SettingsCard>
);

const SecuritySettings = ({ onSave, isSaving }: { onSave: () => void; isSaving: boolean }) => (
    <SettingsCard
        title="Cài đặt bảo mật"
        description="Quản lý các tính năng bảo mật và xác thực người dùng."
        footer={
            <Button
                variant="primary"
                size="sm"
                onClick={onSave}
                loading={isSaving}
                data-oid="5cl8.ih"
            >
                Lưu thay đổi
            </Button>
        }
        data-oid="3fl647z"
    >
        <FormRow
            label="Xác thực 2 yếu tố (2FA)"
            description="Yêu cầu xác thực 2 yếu tố cho tất cả người dùng hoặc chỉ cho vai trò Giảng viên/Admin."
            data-oid="2wr.dxd"
        >
            <div className="space-y-4" data-oid="ruahxl0">
                <div
                    className="flex items-center justify-between p-4 bg-white border border-light-border rounded-lg"
                    data-oid="mi8:yyx"
                >
                    <div data-oid="_lxauxv">
                        <p className="font-medium" data-oid="k9c.nmw">
                            Bật 2FA cho tất cả người dùng
                        </p>
                        <p className="text-sm text-silver-gray" data-oid="n25l1lv">
                            Yêu cầu xác thực 2 yếu tố cho mọi tài khoản
                        </p>
                    </div>
                    <label data-oid="8_70tgk">
                        <input type="checkbox" data-oid="1xfktpj" />
                        <div className="manabi-toggle-slider" data-oid="rc2lq_4"></div>
                    </label>
                </div>
                <div
                    className="flex items-center justify-between p-4 bg-white border border-light-border rounded-lg"
                    data-oid="z693wm_"
                >
                    <div data-oid="-o40ym6">
                        <p className="font-medium" data-oid="_5np7_8">
                            Chỉ yêu cầu 2FA cho Giảng viên/Admin
                        </p>
                        <p className="text-sm text-silver-gray" data-oid="8:fgwdv">
                            Áp dụng 2FA cho các vai trò có quyền cao
                        </p>
                    </div>
                    <label data-oid="4ubspcs">
                        <input type="checkbox" data-oid=".9eoxud" />
                        <div className="manabi-toggle-slider" data-oid="k6w8kz4"></div>
                    </label>
                </div>
            </div>
        </FormRow>
        <FormRow
            label="Phiên đăng nhập"
            description="Thời gian phiên đăng nhập tự động hết hạn (phút)."
            data-oid="22pb4ea"
        >
            <div className="flex items-center gap-2" data-oid="u2yuwcb">
                <input
                    type="number"
                    className="manabi-input w-32"
                    defaultValue="120"
                    min="30"
                    max="1440"
                    data-oid="437cz46"
                />

                <span className="text-charcoal-gray" data-oid="10vczrc">
                    phút
                </span>
            </div>
        </FormRow>
    </SettingsCard>
);

const IntegrationsSettings = ({ onSave, isSaving }: { onSave: () => void; isSaving: boolean }) => (
    <SettingsCard
        title="API & Tích hợp"
        description="Quản lý API keys cho các dịch vụ bên thứ ba."
        footer={
            <Button
                variant="primary"
                size="sm"
                onClick={onSave}
                loading={isSaving}
                data-oid="_hjyl9i"
            >
                Lưu thay đổi
            </Button>
        }
        data-oid="5sjo8wo"
    >
        <FormRow
            label="Google OAuth"
            description="API keys cho đăng nhập bằng Google."
            data-oid="r5d.4d9"
        >
            <div className="space-y-4" data-oid="q27wu1t">
                <div data-oid="js2sz42">
                    <label
                        className="block text-sm font-medium text-charcoal-gray mb-2"
                        data-oid="90if7we"
                    >
                        Google Client ID
                    </label>
                    <input
                        type="text"
                        className="manabi-input"
                        placeholder="your-google-client-id.apps.googleusercontent.com"
                        data-oid="fgxjsv5"
                    />
                </div>
                <div data-oid="l7numi4">
                    <label
                        className="block text-sm font-medium text-charcoal-gray mb-2"
                        data-oid="9-ooen3"
                    >
                        Google Client Secret
                    </label>
                    <input
                        type="password"
                        className="manabi-input"
                        placeholder="GOCSPX-..."
                        data-oid="a2hqsg0"
                    />
                </div>
            </div>
        </FormRow>
        <FormRow
            label="Facebook Login"
            description="API keys cho đăng nhập bằng Facebook."
            data-oid="31nkvr9"
        >
            <div className="space-y-4" data-oid="0xo5.85">
                <div data-oid="jqxz_-e">
                    <label
                        className="block text-sm font-medium text-charcoal-gray mb-2"
                        data-oid=".v4.-7u"
                    >
                        Facebook App ID
                    </label>
                    <input
                        type="text"
                        className="manabi-input"
                        placeholder="123456789012345"
                        data-oid="qrnqss8"
                    />
                </div>
                <div data-oid="4wn8hun">
                    <label
                        className="block text-sm font-medium text-charcoal-gray mb-2"
                        data-oid="7t8d:q3"
                    >
                        Facebook App Secret
                    </label>
                    <input
                        type="password"
                        className="manabi-input"
                        placeholder="abcdef123456..."
                        data-oid="h80glzy"
                    />
                </div>
            </div>
        </FormRow>
        <FormRow
            label="Amazon S3"
            description="Cấu hình lưu trữ file trên Amazon S3."
            data-oid="hrkqyn-"
        >
            <div className="space-y-4" data-oid="0.ojfcm">
                <div data-oid="jo:qiql">
                    <label
                        className="block text-sm font-medium text-charcoal-gray mb-2"
                        data-oid="kvw.-hb"
                    >
                        S3 Bucket Name
                    </label>
                    <input
                        type="text"
                        className="manabi-input"
                        placeholder="manabi-link-files"
                        data-oid="06:104h"
                    />
                </div>
                <div data-oid="9v:4q57">
                    <label
                        className="block text-sm font-medium text-charcoal-gray mb-2"
                        data-oid="uin2z9u"
                    >
                        AWS Access Key ID
                    </label>
                    <input
                        type="text"
                        className="manabi-input"
                        placeholder="AKIA..."
                        data-oid="17g5w82"
                    />
                </div>
                <div data-oid="f6g27ri">
                    <label
                        className="block text-sm font-medium text-charcoal-gray mb-2"
                        data-oid="_xo8h5d"
                    >
                        AWS Secret Access Key
                    </label>
                    <input
                        type="password"
                        className="manabi-input"
                        placeholder="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
                        data-oid="jn73kyp"
                    />
                </div>
            </div>
        </FormRow>
    </SettingsCard>
);

export default AdminSettingsPage;
